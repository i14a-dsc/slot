import { client } from "../..";
import { replace } from "../../util/placeholder";

export function ready() {
  console.log(
    replace(
      [
        "%gray------%r %greenClient is ready%r %gray------",
        "%gray|%r Logged in as %!blue%1%blue#%2",
        "%gray|%r Date: %!blue%date",
        `%gray|%r Version: %!blue%version`,
        "%gray-----------------------------",
      ],
      client.user.username,
      client.user.discriminator,
    ),
  );
}
