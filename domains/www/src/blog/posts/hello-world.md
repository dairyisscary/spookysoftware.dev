+++
title = "Hello World"
publishDate = "2020-01-28T00:15:03.870Z"
+++

Hello world!

```rust
fn main() {
    println!("Hello world!");
}
```

```zig
pub fn main(init: std.process.Init) !void {
    const out = @import("std").Io.File.stdout();
    try out.writeStreamingAll(init.io, "Hello world!\n");
}
```

```elixir
IO.puts("Hello world!")
```
