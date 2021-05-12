// Constants
import * as battleTypes from "../constants/battles-constants";

// BATTLE
export const battleRequest = () => ({
	type: battleTypes.BATTLE_REQUEST,
});

export const battleSuccess = (response) => ({
	type: battleTypes.BATTLE_SUCCESS,
	response,
});

export const battleFailure = () => ({
	type: battleTypes.BATTLE_FAILURE,
});

// GET BATTLES HISTORY
export const getBattlesHistoryRequest = (sort) => ({
	type: battleTypes.GET_BATTLES_HISTORY_REQUEST,
	sort
});

export const getBattlesHistroySuccess = (battles) => ({
	type: battleTypes.GET_BATTLES_HISTORY_SUCCESS,
	battles
});

export const getBattlesHistoryFailure = () => ({
	type: battleTypes.GET_BATTLES_HISTORY_FAILURE,
});

// CLEAR BATTLE RESULT

export const clearBattleResult = () => ({
	type: battleTypes.CLEAR_BATTLE_RESULT,
});
