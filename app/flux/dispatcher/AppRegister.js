import AppDispatcher from './AppDispatcher';

/**
 * Lie un store passé en argument à ses actions ainsi qu'au Dispatcher
 *
 * @param  {object} store - Store qui s'enregistre au dispatcher
 * @param  {function} storeActionsGetter - retourne un switch case des actions du store
 * @param  {boolean} forceResetToken - force la remise à zero de tous les tokens du dispatcher ( utilisé pour les tests )
 * @return {function} register - fonction qui une fois executée retourne le token d'enregistrement au format string
 */
export const register = (store, storeActionsGetter, forceResetToken = false) => {
  const storeToken = store.dispatchToken;
  const allTokens = Object.keys(AppDispatcher._callbacks);
  if (forceResetToken) allTokens.forEach((id) => AppDispatcher.unregister(id));

  if (allTokens.length && allTokens.indexOf(storeToken) >= 0) return store.dispatchToken;

  return AppDispatcher.register(storeActionsGetter(store));
};
