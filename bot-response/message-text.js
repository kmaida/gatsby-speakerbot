/*------------------
    MESSAGE TEXT
------------------*/

const msgText = {
  newConfirm: (rotation) => {
    return ':sparkles: The *' + rotation + '* rotation has been created. You can now assign someone to be on-call for this rotation or add a staff list. Use `@rota help` to learn more.';
  },
  error: (err) => {
    return ":cry: I'm sorry, I couldn't do that because an error occurred:\n```" + err + "```";
  }
}

module.exports = msgText;