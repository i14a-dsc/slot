import { client } from "../..";
import { replace } from "../../util/placeholder";

export function ready() {
  console.log(
    replace(
      [
        "%gray------%r %greenClient is ready%r %gray------%r",
        "%gray|%r Logged in as %!blue%1%blue#%2%r",
        "%gray|%r Date: %!blue%date%r",
        `%gray|%r Version: %!blue%version%r`,
        "%gray-----------------------------%r",
      ],
      client.user.username,
      client.user.discriminator,
    ),
  );
}
