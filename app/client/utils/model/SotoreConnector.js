// import {getIn} from "utils/jsUtils";
// import store from "server/store";
// export default class StoreConnector {
//
//     constructor(entityId) {
//         if (!entityId) throw new Error('Cant create Store Connector without entity id !', entityId);
//         if (Array.isArray(entityId)) entityId = entityId.join('__');
//
//         // Позволяет создавтаь коннекторы из консоли
//         if (process.env.NODE_ENV === 'development') {
//             window[this.constructor.name] = this.constructor;
//         }
//
//         this.constructor.__connectorsCache = this.constructor.__connectorsCache || {};
//         if (!this.constructor.__connectorsCache[entityId]) this.constructor.__connectorsCache[entityId] = this;
//         return this.constructor.__connectorsCache[entityId];
//     }
//
//
//     /**
//      * Подписка на изменение значений сущности для которой предназначен коннектор.
//      * ВАЖНО: т.к. поулчаение сущности зависит от реализации коннектора, для получения сущности в алгоритме подписки
//      * используется метод {@link __getEntity}, который необходимо реализовать в наследниках
//      * @param listener - слушатель, который будет вызван при изменении сущности
//      * @return {Function} - функция прекращения прослушки изменений
//      */
//     listenChanges(listener) {
//         this.constructor.__changeListeners = this.constructor.__changeListeners || [];
//         if (this.constructor.__changeListeners.indexOf(listener) !== -1) return () => 1;
//
//         // При навешивании первого колбека, выполняется подписка на изменение store, которая будет дергать всех слушателей
//         if (this.constructor.__changeListeners.length === 0) {
//             this.constructor.__entity = this.__getEntity();
//
//             this.constructor.__unsub = store.subscribe(() => {
//                 const newEntity = this.__getEntity();
//                 if (newEntity !== this.constructor.__entity) {
//                     this.constructor.__entity = newEntity;
//                     this.constructor.__changeListeners.forEach(listener => listener());
//                 }
//             });
//         }
//
//         return () => {
//             const callbackIdx = this.constructor.__changeListeners.indexOf(callback);
//             this.constructor.__changeListeners.splice(callbackIdx);
//
//             // Если отписался последний слушатель, вызывается отписка от прослушки изменений store
//             if (this.constructor.__changeListeners.length === 0 && this.constructor.__unsub) {
//                 this.constructor.__unsub();
//                 this.constructor.__unsub = null;
//             }
//         }
//     }
//
//     /**
//      * Возвращает сущность из store, для которой создан коннектор. Используется в подписке на изменения объекта
//      * {@ling listenChanges}. Должен быть переопределен с учетом особеностей получения сущности. В дефолтном
//      * варианте всегда возвращает 42.
//      * @override
//      * @abstract
//      * @private
//      */
//     __getEntity() {
//         return 42;
//     }
// }
//
// StoreConnector.getId = function (value, idPath) {
//     if (typeof value === 'string' || !value) return value;
//     return getIn(value, idPath, null);
// };
