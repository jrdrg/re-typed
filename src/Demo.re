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
       "\nThis text is appended to the end of the previous line.",
       ~preserve=true,
     )
  |> Typer.wait(500)
  |> Typer.write(
       "\nAnd this one is also written on a new line.",
       ~preserve=true,
     )
  |> Typer.wait(500)
  |> Typer.write("This text <b>has bold</b> and <i>italic</i> words.")
  |> Typer.write(
       "\nThis <span style=\"color:red;\">has red</b> words.",
       ~preserve=true,
     )
  |> ignore
};
