interface GroupWallPostRequest {
  previousPageCursor?: string;
  nextPageCursor?: string;
  data: GroupWallPost[];
}

interface GroupWallPost {
  id: number;
  body: string;
  created: Date;
  updated: Date;
  poster: GroupWallPostPoster;
}

interface GroupWallPostPoster {
  userId: number;
  username: string;
  displayName: string;
  hasVerifiedBadge: boolean;
}

export default class RequestUtils {
  private static token: string = "";
  private static url: string = "https://groups.roblox.com/v1";

  // This function is used to make a request and retry if the token is invalid.
  private static async request<T>(
    endpoint: string,
    method: "GET" | "DELETE" | "POST" | "PATCH" = "GET",
    parameters?: URLSearchParams
  ): Promise<T> {
    const response = await fetch(
      `${this.url}${endpoint}${parameters ? `?${parameters.toString()}` : ""}`,
      {
        method,
        headers: {
          Cookie: `.ROBLOSECURITY=${process.env.COOKIE}`,
          "x-csrf-token": this.token,
        },
      }
    );

    // If the response is 403, we need to send the request again with the provided token.
    if (response.status === 403) {
      this.token = response.headers.get("x-csrf-token");
      return this.request(endpoint, method, parameters);
    }

    // If there is another error, we throw it.
    if (!response.ok) throw new Error(JSON.stringify(await response.json()));

    // If the response is 200, we return the json.
    return await response.json();
  }

  // This function is used to get a list of group posts.
  public static async getPosts(groupId: number) {
    // We create the parameters for the request.
    const parameters = new URLSearchParams({
      sortOrder: "Desc",
      limit: "100",
    });

    // We make the request.
    const response = await this.request<GroupWallPostRequest>(
      `/groups/${groupId}/wall/posts`,
      "GET",
      parameters
    );

    // We return the data.
    return response.data;
  }

  // This function is used to delete a group post.
  public static async deletePost(groupId: number, postId: number) {
    // We make the request.
    await this.request(`/groups/${groupId}/wall/posts/${postId}`, "DELETE");
  }
}
