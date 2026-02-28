import client from "../client";

export const codeService = {
    getAllPublicCode: () => client.get("/code/all/public"),
};
