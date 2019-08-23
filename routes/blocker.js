function blockerRoutes(app, dsteem) {
  const blacklist = ["theycallmedan"];
  const client = new dsteem.Client("https://api.steemit.com");
  async function queryVotes(permlink, author) {
    const query = {
      tag: "",
      limit: 1,
      start_author: author,
      start_permlink: permlink,
      truncate_body: 1
    };
    return await client.database
      .getDiscussions("trending", query)
      .then(data => data[0].active_votes.map(list => list.voter))
      .catch(err => err);
  }

  async function dataCheck(permlink, author) {
    let data = await queryVotes(permlink, author);
    let block =
      Array.isArray(data) && data.some(voter => blacklist.includes(voter));
    return JSON.stringify({ block });
  }

  app.get("/:permlink/:author", async (req, res) => {
    res.set("Content-Type", "application/json");
    const { permlink, author } = req.params;
    const end = await dataCheck(permlink, author);

    res.send(end);
  });
}
module.exports = blockerRoutes;
