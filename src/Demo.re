open Utils;

switch (Document.querySelector("#root")) {
| None => ()
| Some(el) =>
  Typer.make(el)
  |> Typer.write("This is some test text to use as a demo.")
  |> Typer.wait(1000)
  |> Typer.write("Some more text...")
  |> Typer.wait(2000)
  |> Typer.write("And yet another sentence.")
  |> Typer.wait(1000)
  |> Typer.write(
       "This text is appended to the end of the previous line.",
       ~preserve=true,
     )
  |> ignore
};
