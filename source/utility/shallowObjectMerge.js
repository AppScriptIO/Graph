"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.shallowMergeNonExistingPropertyOnly = shallowMergeNonExistingPropertyOnly;
function shallowMergeNonExistingPropertyOnly({ targetObject, baseObject }) {
  return Object.keys(baseObject).reduce(function (accumulator, key) {
    if (!accumulator[key]) accumulator[key] = baseObject[key];
    return accumulator;
  }, targetObject);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS91dGlsaXR5L3NoYWxsb3dPYmplY3RNZXJnZS5qcyJdLCJuYW1lcyI6WyJzaGFsbG93TWVyZ2VOb25FeGlzdGluZ1Byb3BlcnR5T25seSIsInRhcmdldE9iamVjdCIsImJhc2VPYmplY3QiLCJPYmplY3QiLCJrZXlzIiwicmVkdWNlIiwiYWNjdW11bGF0b3IiLCJrZXkiXSwibWFwcGluZ3MiOiI7QUFDTyxTQUFTQSxtQ0FBVCxDQUE2QyxFQUFFQyxZQUFGLEVBQWdCQyxVQUFoQixFQUE3QyxFQUEyRTtBQUNoRixTQUFPQyxNQUFNLENBQUNDLElBQVAsQ0FBWUYsVUFBWixFQUF3QkcsTUFBeEIsQ0FBK0IsVUFBU0MsV0FBVCxFQUFzQkMsR0FBdEIsRUFBMkI7QUFDL0QsUUFBSSxDQUFDRCxXQUFXLENBQUNDLEdBQUQsQ0FBaEIsRUFBdUJELFdBQVcsQ0FBQ0MsR0FBRCxDQUFYLEdBQW1CTCxVQUFVLENBQUNLLEdBQUQsQ0FBN0I7QUFDdkIsV0FBT0QsV0FBUDtBQUNELEdBSE0sRUFHSkwsWUFISSxDQUFQO0FBSUQiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBhZGQgYmFzZSBvYmplY3QgdG8gdGFyZ2V0IG9iamVjdCB3aXRob3V0IG92ZXJ3cml0aW5nIGV4aXN0aW5nIHByb3BlcnRpZXMuXHJcbmV4cG9ydCBmdW5jdGlvbiBzaGFsbG93TWVyZ2VOb25FeGlzdGluZ1Byb3BlcnR5T25seSh7IHRhcmdldE9iamVjdCwgYmFzZU9iamVjdCB9KSB7XHJcbiAgcmV0dXJuIE9iamVjdC5rZXlzKGJhc2VPYmplY3QpLnJlZHVjZShmdW5jdGlvbihhY2N1bXVsYXRvciwga2V5KSB7XHJcbiAgICBpZiAoIWFjY3VtdWxhdG9yW2tleV0pIGFjY3VtdWxhdG9yW2tleV0gPSBiYXNlT2JqZWN0W2tleV1cclxuICAgIHJldHVybiBhY2N1bXVsYXRvclxyXG4gIH0sIHRhcmdldE9iamVjdClcclxufVxyXG4iXX0=