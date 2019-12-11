"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.referenceProperty = exports.rerouteProperty = exports.traversalOption = exports.evaluationOption = exports.connectionProperty = exports.connectionType = exports.nodeLabel = void 0;const nodeLabel = {
  stage: 'Stage',
  port: 'Port',
  process: 'Process',
  configuration: 'Configuration',
  file: 'File',
  function: 'Function',
  reroute: 'Reroute' };exports.nodeLabel = nodeLabel;







const connectionType = {

  reference: 'REFERENCE',
  insert: 'INSERT',
  extend: 'EXTEND',

  next: 'NEXT',
  fork: 'FORK',

  configure: 'CONFIGURE',

  execute: 'EXECUTE',
  resource: 'RESOURCE',
  value: 'VALUE',
  fallback: 'FALLBACK',
  select: 'SELECT',
  case: 'CASE' };exports.connectionType = connectionType;





const connectionProperty = {
  context: ['applicationReference', 'filesystemReference'],
  type: ['properties', 'node', 'valueProperty'] };exports.connectionProperty = connectionProperty;


const evaluationOption = {
  propagation: {

    continue: 'continue',
    break: 'break',
    hult: 'hult' },

  aggregation: {

    include: 'process&include',
    exclude: 'process&exclude',
    skip: 'skipProcess' } };exports.evaluationOption = evaluationOption;



const traversalOption = ['processNode', 'portNode', 'aggregator', 'traversalInterception'];exports.traversalOption = traversalOption;

const rerouteProperty = {
  externalReferenceNodeKey: 'externalReferenceNodeKey' };exports.rerouteProperty = rerouteProperty;


const referenceProperty = {
  resolutionImplementation: ['selection', 'node'] };exports.referenceProperty = referenceProperty;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9kYXRhTW9kZWwvZ3JhcGhTY2hlbWVSZWZlcmVuY2UuanMiXSwibmFtZXMiOlsibm9kZUxhYmVsIiwic3RhZ2UiLCJwb3J0IiwicHJvY2VzcyIsImNvbmZpZ3VyYXRpb24iLCJmaWxlIiwiZnVuY3Rpb24iLCJyZXJvdXRlIiwiY29ubmVjdGlvblR5cGUiLCJyZWZlcmVuY2UiLCJpbnNlcnQiLCJleHRlbmQiLCJuZXh0IiwiZm9yayIsImNvbmZpZ3VyZSIsImV4ZWN1dGUiLCJyZXNvdXJjZSIsInZhbHVlIiwiZmFsbGJhY2siLCJzZWxlY3QiLCJjYXNlIiwiY29ubmVjdGlvblByb3BlcnR5IiwiY29udGV4dCIsInR5cGUiLCJldmFsdWF0aW9uT3B0aW9uIiwicHJvcGFnYXRpb24iLCJjb250aW51ZSIsImJyZWFrIiwiaHVsdCIsImFnZ3JlZ2F0aW9uIiwiaW5jbHVkZSIsImV4Y2x1ZGUiLCJza2lwIiwidHJhdmVyc2FsT3B0aW9uIiwicmVyb3V0ZVByb3BlcnR5IiwiZXh0ZXJuYWxSZWZlcmVuY2VOb2RlS2V5IiwicmVmZXJlbmNlUHJvcGVydHkiLCJyZXNvbHV0aW9uSW1wbGVtZW50YXRpb24iXSwibWFwcGluZ3MiOiJ1UUFBTyxNQUFNQSxTQUFTLEdBQUc7QUFDdkJDLEVBQUFBLEtBQUssRUFBRSxPQURnQjtBQUV2QkMsRUFBQUEsSUFBSSxFQUFFLE1BRmlCO0FBR3ZCQyxFQUFBQSxPQUFPLEVBQUUsU0FIYztBQUl2QkMsRUFBQUEsYUFBYSxFQUFFLGVBSlE7QUFLdkJDLEVBQUFBLElBQUksRUFBRSxNQUxpQjtBQU12QkMsRUFBQUEsUUFBUSxFQUFFLFVBTmE7QUFPdkJDLEVBQUFBLE9BQU8sRUFBRSxTQVBjLEVBQWxCLEM7Ozs7Ozs7O0FBZUEsTUFBTUMsY0FBYyxHQUFHOztBQUU1QkMsRUFBQUEsU0FBUyxFQUFFLFdBRmlCO0FBRzVCQyxFQUFBQSxNQUFNLEVBQUUsUUFIb0I7QUFJNUJDLEVBQUFBLE1BQU0sRUFBRSxRQUpvQjs7QUFNNUJDLEVBQUFBLElBQUksRUFBRSxNQU5zQjtBQU81QkMsRUFBQUEsSUFBSSxFQUFFLE1BUHNCOztBQVM1QkMsRUFBQUEsU0FBUyxFQUFFLFdBVGlCOztBQVc1QkMsRUFBQUEsT0FBTyxFQUFFLFNBWG1CO0FBWTVCQyxFQUFBQSxRQUFRLEVBQUUsVUFaa0I7QUFhNUJDLEVBQUFBLEtBQUssRUFBRSxPQWJxQjtBQWM1QkMsRUFBQUEsUUFBUSxFQUFFLFVBZGtCO0FBZTVCQyxFQUFBQSxNQUFNLEVBQUUsUUFmb0I7QUFnQjVCQyxFQUFBQSxJQUFJLEVBQUUsTUFoQnNCLEVBQXZCLEM7Ozs7OztBQXNCQSxNQUFNQyxrQkFBa0IsR0FBRztBQUNoQ0MsRUFBQUEsT0FBTyxFQUFFLENBQUMsc0JBQUQsRUFBeUIscUJBQXpCLENBRHVCO0FBRWhDQyxFQUFBQSxJQUFJLEVBQUUsQ0FBQyxZQUFELEVBQWUsTUFBZixFQUF1QixlQUF2QixDQUYwQixFQUEzQixDOzs7QUFLQSxNQUFNQyxnQkFBZ0IsR0FBRztBQUM5QkMsRUFBQUEsV0FBVyxFQUFFOztBQUVYQyxJQUFBQSxRQUFRLEVBQUUsVUFGQztBQUdYQyxJQUFBQSxLQUFLLEVBQUUsT0FISTtBQUlYQyxJQUFBQSxJQUFJLEVBQUUsTUFKSyxFQURpQjs7QUFPOUJDLEVBQUFBLFdBQVcsRUFBRTs7QUFFWEMsSUFBQUEsT0FBTyxFQUFFLGlCQUZFO0FBR1hDLElBQUFBLE9BQU8sRUFBRSxpQkFIRTtBQUlYQyxJQUFBQSxJQUFJLEVBQUUsYUFKSyxFQVBpQixFQUF6QixDOzs7O0FBZUEsTUFBTUMsZUFBZSxHQUFHLENBQUMsYUFBRCxFQUFnQixVQUFoQixFQUE0QixZQUE1QixFQUEwQyx1QkFBMUMsQ0FBeEIsQzs7QUFFQSxNQUFNQyxlQUFlLEdBQUc7QUFDN0JDLEVBQUFBLHdCQUF3QixFQUFFLDBCQURHLEVBQXhCLEM7OztBQUlBLE1BQU1DLGlCQUFpQixHQUFHO0FBQy9CQyxFQUFBQSx3QkFBd0IsRUFBRSxDQUFDLFdBQUQsRUFBYyxNQUFkLENBREssRUFBMUIsQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBub2RlTGFiZWwgPSB7XG4gIHN0YWdlOiAnU3RhZ2UnLFxuICBwb3J0OiAnUG9ydCcsXG4gIHByb2Nlc3M6ICdQcm9jZXNzJyxcbiAgY29uZmlndXJhdGlvbjogJ0NvbmZpZ3VyYXRpb24nLFxuICBmaWxlOiAnRmlsZScsXG4gIGZ1bmN0aW9uOiAnRnVuY3Rpb24nLFxuICByZXJvdXRlOiAnUmVyb3V0ZScsXG4gIC8vIGV2YWx1YXRpb246ICdFdmFsdWF0aW9uJyxcbiAgLy8gc3ViZ3JhcGhUZW1wbGF0ZTogJ1N1YmdyYXBoVGVtcGxhdGUnLFxuICAvLyBub2RlUmVmZXJlbmNlOiAnTm9kZVJlZmVyZW5jZScsXG4gIC8vIHN3aXRjaDogJ1N3aXRjaCcsXG4gIC8vIHN3aXRjaEJvb2xlYW46ICdTd2l0Y2hCb29sZWFuJyxcbn1cblxuZXhwb3J0IGNvbnN0IGNvbm5lY3Rpb25UeXBlID0ge1xuICAvLyBSZXJvdXRlXG4gIHJlZmVyZW5jZTogJ1JFRkVSRU5DRScsXG4gIGluc2VydDogJ0lOU0VSVCcsXG4gIGV4dGVuZDogJ0VYVEVORCcsXG4gIC8vIFN0YWdlXG4gIG5leHQ6ICdORVhUJyxcbiAgZm9yazogJ0ZPUksnLFxuICAvL1RPRE86IGltcGxlbWVudCBgZGVwdGhBZmZlY3RlZGAgcHJvcGVydHkgZm9yIENPTkZJR1VSRSBjb25uZWN0aW9uXG4gIGNvbmZpZ3VyZTogJ0NPTkZJR1VSRScsXG4gIC8vIFByb2Nlc3MgJiBFdmFsdWF0aW9uXG4gIGV4ZWN1dGU6ICdFWEVDVVRFJyxcbiAgcmVzb3VyY2U6ICdSRVNPVVJDRScsXG4gIHZhbHVlOiAnVkFMVUUnLCAvLyB7dHlwZTogJ25vZGUnIHx8ICdwcm9wZXJ0aWVzJ30gaS5lLiByZXR1cm4gdGhlIG5vZGUgcmVmZXJlbmNlIG9yIHJldHVybiBpdHMgcHJvcGVydGllcy5cbiAgZmFsbGJhY2s6ICdGQUxMQkFDSycsXG4gIHNlbGVjdDogJ1NFTEVDVCcsXG4gIGNhc2U6ICdDQVNFJyxcbiAgLy8gcm9vdDogJ1JPT1QnLFxuICAvLyBydW46ICdSVU4nLCAvLyBydW4gYXMgc3ViZ3JhcGggd2hlcmUgdGhlIHJlc3VsdCBvZiB0aGUgc3ViZ3JhcGggdHJhdmVyc2FsIGlzIHRvIGJlIHVzZWQgaW4gdGhlIHN0YWdlIG5vZGUgY2FsbGluZyBpdC5cbiAgLy8gaW5oZXJpdDogJ0lOSEVSSVQnLFxufVxuXG5leHBvcnQgY29uc3QgY29ubmVjdGlvblByb3BlcnR5ID0ge1xuICBjb250ZXh0OiBbJ2FwcGxpY2F0aW9uUmVmZXJlbmNlJywgJ2ZpbGVzeXN0ZW1SZWZlcmVuY2UnXSxcbiAgdHlwZTogWydwcm9wZXJ0aWVzJywgJ25vZGUnLCAndmFsdWVQcm9wZXJ0eSddLFxufVxuXG5leHBvcnQgY29uc3QgZXZhbHVhdGlvbk9wdGlvbiA9IHtcbiAgcHJvcGFnYXRpb246IHtcbiAgICAvLyB0cmF2ZXJzZSBuZWlnaGJvdXJzIG9yIG5vdC5cbiAgICBjb250aW51ZTogJ2NvbnRpbnVlJywgLy8gY29udGludWUgdHJhdmVyc2FsIG9mIGNoaWxkIG5vZGVzXG4gICAgYnJlYWs6ICdicmVhaycsIC8vIGRvIG5vdCB0cmF2ZXJzZSBzdWJwcm9jZXNzXG4gICAgaHVsdDogJ2h1bHQnLCAvLyBodWx0IHRyYXZlcnNhbCBhbGwgdG9nZXRoZXIgYW5kIHJldHVybi5cbiAgfSxcbiAgYWdncmVnYXRpb246IHtcbiAgICAvLyBleGVjdXRlICYgaW5jbHVkZSBvciBkb24ndCBleGVjdXRlICYgZXhjbHVkZSBmcm9tIGFnZ3JlZ2F0ZWQgcmVzdWx0cy5cbiAgICBpbmNsdWRlOiAncHJvY2VzcyZpbmNsdWRlJyxcbiAgICBleGNsdWRlOiAncHJvY2VzcyZleGNsdWRlJyxcbiAgICBza2lwOiAnc2tpcFByb2Nlc3MnLFxuICB9LFxufVxuXG5leHBvcnQgY29uc3QgdHJhdmVyc2FsT3B0aW9uID0gWydwcm9jZXNzTm9kZScsICdwb3J0Tm9kZScsICdhZ2dyZWdhdG9yJywgJ3RyYXZlcnNhbEludGVyY2VwdGlvbiddXG5cbmV4cG9ydCBjb25zdCByZXJvdXRlUHJvcGVydHkgPSB7XG4gIGV4dGVybmFsUmVmZXJlbmNlTm9kZUtleTogJ2V4dGVybmFsUmVmZXJlbmNlTm9kZUtleScsXG59XG5cbmV4cG9ydCBjb25zdCByZWZlcmVuY2VQcm9wZXJ0eSA9IHtcbiAgcmVzb2x1dGlvbkltcGxlbWVudGF0aW9uOiBbJ3NlbGVjdGlvbicsICdub2RlJ10sXG59XG4iXX0=