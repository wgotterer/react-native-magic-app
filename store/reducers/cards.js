import { CARDS } from "../../data/dummy-data";
import { SET_FILTERS, TOGGLE_FAVORITE } from "../actions/cards";

// store or slices of store
const initialState = {
  cards: CARDS,
  filteredCards: CARDS,
  favoriteCards: [],
};

const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      // if the card in my favecards array has the same id as the card we are doing the action on then we want to remove that from the array
      // if findIdex is false it returns -1
      const existingIndex = state.favoriteCards.findIndex(
        (card) => card.id === action.cardId
      );
      if (existingIndex >= 0) {
        const updatedFavCards = [...state.favoriteCards];
        updatedFavCards.splice(existingIndex, 1);
        return { ...state, favoriteCards: updatedFavCards };
      } else {
        // concate makes a new array and adds an item
        const card = state.cards.find((card) => card.id === action.cardId);
        return { ...state, favoriteCards: state.favoriteCards.concat(card) };
      }
    case SET_FILTERS:
      const appliedFilters = action.filters;
      const updatedFilteredCards = state.cards.filter((card) => {
        if (appliedFilters.creature && !card.isCreature) {
          return false;
        }
        if (appliedFilters.sorcery && !card.isSorcery) {
          return false;
        }
        if (appliedFilters.instant && !card.isInstant) {
          return false;
        }
        if (appliedFilters.artifact && !card.isArtifact) {
          return false;
        }
        return true;
      });
      return { ...state, filteredCards: updatedFilteredCards };
    default:
      return state;
  }
};
export default cardsReducer;
