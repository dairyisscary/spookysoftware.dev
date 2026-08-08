const PORT = 3040
const HOST = 'localhost'
const PREVIEW_SERVER_BASE_URL = $"http://($HOST):($PORT)"

def build [] {
  pnpm exec vite build
}

def "preview_server wait" []: nothing -> bool {
  mut attempts = 0
  while $attempts < 10 {
    try {
      http get $PREVIEW_SERVER_BASE_URL
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
  job spawn { pnpm exec vite preview --host $HOST --port $PORT --strict-port }
}

def "preview_server kill" []: int -> nothing {
  let server_thread_id = $in

  let nu_parent_pid = $nu.pid
  let child_node_process_ids = ps --long
    | where $it.ppid == $nu_parent_pid and $it.name == 'node'
    | get pid

  if ($child_node_process_ids | is-not-empty) {
    kill ...$child_node_process_ids
  }

  job kill $server_thread_id
}

def main [] {
  # First build the initial bundles
  print "Building first without a resume PDF"
  build

  # Run a preview server for playwright to collect a PDF of the resume
  print $"Launching preview server at ($PREVIEW_SERVER_BASE_URL)"
  let server_thread_id = preview_server start

  print "Waiting for preview server to be ready"
  let success = preview_server wait
  if not $success {
    $server_thread_id | preview_server kill
    exit 1
  }

  # Set the env var that the second build will use
  let pdf_file_path = mktemp --dry --directory | path join resume.pdf
  $env.RESUME_PDF_FILE = $pdf_file_path

  print $"Running playwright to capture a resume PDF at ($pdf_file_path)"
  BASE_SERVER_URL=$PREVIEW_SERVER_BASE_URL node bin/capture-pdf-resume.ts

  $server_thread_id | preview_server kill

  print "Building again with a resume PDF"
  build

  rm $pdf_file_path
}
