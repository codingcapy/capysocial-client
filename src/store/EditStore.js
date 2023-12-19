
/*
author: Paul Kim
date: November 13, 2023
version: 1.0
description:editstore for social platform 1 project
 */

import { create } from "zustand"

export const useEditStore = create((set) => ({
    editMode: false,
    commentEditMode: false,
    toggleEditMode: () => set((state) => ({
        editMode: !state.editMode
    })),
    toggleCommentEditMode: () => set((state) => ({
        commentEditMode: !state.commentEditMode
    }))
}))