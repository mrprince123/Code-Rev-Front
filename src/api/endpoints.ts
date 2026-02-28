// Here, I have to register all the routes from the backend. 

export const ENDPOINTS = {

    code: {
        getAllPublicCode: "code/all",
        submitCode: "code/create",
        getCodeById: (slug: string) => `code/get/${slug}`, // also used for the full code view.
        updateCode: (slug: string) => `code/update/${slug}`,
        getAllProfileCode: (slug: string) => `code/all/${slug}`,
        getFullPublicCode: (slug: string) => `code/get/public/${slug}`
    },

    commets: {
        addComment: (id: number) => `review/submit/${id}`,
        deleteComment: (id: number) => `review/delete/${id}`,
        updateComment: (id: number) => `review/update/${id}`,
    },

    profile: {

    }


}