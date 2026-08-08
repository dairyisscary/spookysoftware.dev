const PREVIEW_SERVER_PORT = 3040

def build []: nothing -> nothing {
  pnpm exec vite build --clear-screen false
}

def "preview_server wait" []: nothing -> bool {
  print $"Waiting for preview server at ($env.BASE_SERVER_URL)"
  mut attempts = 0
  while $attempts < 10 {
    try {
      http get $env.BASE_SERVER_URL
      print "Response from server!"
      return true
    } catch {
      print "No response yet, trying again after 1 second."
      sleep 1sec
    }
    $attempts += 1
  }
  print $"No response from preview server, gave up after ($attempts). Exiting..."
  return false
}

def "preview_server start" []: nothing -> int {
  print $"Launching preview server at ($env.BASE_SERVER_URL)"
  job spawn {
    try {
      (
        pnpm exec vite preview
          --host '0.0.0.0'
          --port $PREVIEW_SERVER_PORT --strict-port
          --clear-screen false
      )
    } catch { |error|
      if $error.msg != 'External command was terminated by a signal' {
        print $error
      }
    }
  }
}

def "preview_server interrupt" []: int -> nothing {
  let server_thread_id = $in

  print "Interrupting preview server"
  let nu_parent_pid = $nu.pid
  let child_node_process_ids = ps --long
    | where $it.ppid == $nu_parent_pid and $it.command =~ 'pnpm exec vite preview'
    | get pid

  if ($child_node_process_ids | is-empty) {
    print "No processes to interrupt"
    exit 1
  }

  print $"Interrupting process ids ($child_node_process_ids | str join ', ')"
  # Sigint (ctrl+c)
  kill --signal 2 ...$child_node_process_ids
}

def "preview_server with" [with_block: closure]: nothing -> nothing {
  let server_thread_id = preview_server start

  let success = preview_server wait
  if not $success {
    $server_thread_id | preview_server interrupt
    exit 1
  }

  do $with_block

  $server_thread_id | preview_server interrupt
}

def main [] {
  print "Building first without a resume PDF"
  build

  let pdf_file_path = mktemp --dry --directory | path join resume.pdf
  $env.RESUME_PDF_FILE = $pdf_file_path
  $env.BASE_SERVER_URL = $"http://localhost:($PREVIEW_SERVER_PORT)"

  preview_server with {
    print $"Capturing a resume PDF at ($pdf_file_path)"
    node bin/capture-pdf-resume.ts
  }

  print "Building again with a resume PDF"
  build
  rm $pdf_file_path

  preview_server with {
    let out_dir = pwd | path join dist/static-routes
    print $"Gathering and rendering routes and redirects to ($out_dir)"
    OUT_DIR=$out_dir node bin/prepare-routes.ts
  }
}
