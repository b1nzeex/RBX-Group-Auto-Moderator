import RequestUtils from "../util/RequestUtils";
import StringUtils from "../util/StringUtils";

export default class RobloxClient {
  private groupId: number;

  public constructor(groupId: string) {
    this.groupId = Number(groupId);
  }

  public async start() {
    await this.moderatePosts();

    // We moderate posts every 5 minutes.
    setInterval(() => this.moderatePosts(), 5 * 60 * 1000); // 5 minutes.
  }

  private async moderatePosts() {
    // We get the posts.
    const posts = await RequestUtils.getPosts(this.groupId);

    // We iterate through the posts.
    for (const post of posts) {
      // We check if the post contains a URL or bad phrase.
      if (
        StringUtils.hasUrl(post.body) ||
        StringUtils.hasBadPhrase(post.body)
      ) {
        // We delete the post.
        await RequestUtils.deletePost(this.groupId, post.id);
      }
    }
  }
}
