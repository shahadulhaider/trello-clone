import { v4 as uuidv4 } from "uuid";
import { AppState } from "../types";
import { Action } from "./actions";
import { findItemIndexById } from "../utils/findItemIndexById";
import { moveItem } from "../utils/moveItem";

export const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "SET_DRAGGED_ITEM": {
      return {
        ...state,
        draggedItem: action.payload
      };
    }
    case "ADD_LIST": {
      return {
        ...state,
        lists: [
          ...state.lists,
          {
            id: uuidv4(),
            text: action.payload,
            tasks: []
          }
        ]
      };
    }

    case "ADD_TASK": {
      const targetIdx = findItemIndexById(state.lists, action.payload.columnId);

      state.lists[targetIdx].tasks.push({
        id: uuidv4(),
        text: action.payload.text
      });

      return {
        ...state
      };
    }

    case "MOVE_LIST": {
      const { dragIndex, hoverIndex } = action.payload;

      state.lists = moveItem(state.lists, dragIndex, hoverIndex);

      return {
        ...state
      };
    }

    case "MOVE_TASK": {
      const {
        dragIndex,
        hoverIndex,
        sourceColumn,
        targetColumn
      } = action.payload;

      const sourceLaneIndex = findItemIndexById(state.lists, sourceColumn);
      const targetLaneIndex = findItemIndexById(state.lists, targetColumn);

      const item = state.lists[sourceLaneIndex].tasks.splice(dragIndex, 1)[0];
      state.lists[targetLaneIndex].tasks.splice(hoverIndex, 0, item);

      return { ...state };
    }

    default: {
      return state;
    }
  }
};
