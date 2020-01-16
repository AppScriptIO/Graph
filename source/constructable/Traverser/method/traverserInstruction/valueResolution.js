"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports, "__esModule", { value: true });exports.resolveValue = resolveValue;exports.conditionSubgraphValueResolution = conditionSubgraphValueResolution;exports.conditionSubgraphWithNonBooleanValueResolution = conditionSubgraphWithNonBooleanValueResolution;var _assert = _interopRequireDefault(require("assert"));



async function resolveValue({ targetNode, traverseCallContext, allowSelfEdge = false, traverser = this }) {var _context;
  const value = await (_context = traverser.graph.database, traverser.graph.database.getValueElement).call(_context, { nodeID: targetNode.identity });
  if (!value) return;

  let resolvedValue;

  switch (value.connection.properties.implementation) {

    case 'conditionSubgraph':
      if (!allowSelfEdge)
      (0, _assert.default)(!traverser.graph.database.isSelfEdge(value), `• Self-edge for VALUE connection with "conditionSubgraph" implementation, currently not supported, as it causes infinite loop.`);
      resolvedValue = await traverser.traverserInstruction.valueResolution.conditionSubgraphValueResolution.call(traverser, { value, traverseCallContext });
      break;
    case 'properties':
      resolvedValue = value.source.properties;
      break;
    case 'node':
      resolvedValue = value.source;
      break;
    case 'valueProperty':
    default:
      resolvedValue = value.source.properties.value;
      break;}

  return resolvedValue;
}













async function conditionSubgraphValueResolution({ value, traverseCallContext, traverser = this }) {
  let resolvedValue;


  let resultValueArray = await traverser.traverse.call(traverser,





  {
    nodeInstance: value.source,
    implementationKey: {
      processNode: 'executeFunctionReference',
      traversalInterception: 'traverseThenProcessWithLogicalOperator',
      aggregator: 'ConditionAggregator' } },


  {
    traverseCallContext: {
      targetNode: traverseCallContext && traverseCallContext.targetNode || value.destination } });




  if (resultValueArray.length > 1) resolvedValue = resultValueArray.every(item => Boolean(item));else
  if (resultValueArray.length != 0) resolvedValue = resultValueArray[0];
  return resolvedValue;
}


async function conditionSubgraphWithNonBooleanValueResolution({ value, graph, traverseCallContext }) {}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NvdXJjZS9jb25zdHJ1Y3RhYmxlL1RyYXZlcnNlci9tZXRob2QvdHJhdmVyc2VySW5zdHJ1Y3Rpb24vdmFsdWVSZXNvbHV0aW9uLmpzIl0sIm5hbWVzIjpbInJlc29sdmVWYWx1ZSIsInRhcmdldE5vZGUiLCJ0cmF2ZXJzZUNhbGxDb250ZXh0IiwiYWxsb3dTZWxmRWRnZSIsInRyYXZlcnNlciIsInZhbHVlIiwiZ3JhcGgiLCJkYXRhYmFzZSIsImdldFZhbHVlRWxlbWVudCIsIm5vZGVJRCIsImlkZW50aXR5IiwicmVzb2x2ZWRWYWx1ZSIsImNvbm5lY3Rpb24iLCJwcm9wZXJ0aWVzIiwiaW1wbGVtZW50YXRpb24iLCJpc1NlbGZFZGdlIiwidHJhdmVyc2VySW5zdHJ1Y3Rpb24iLCJ2YWx1ZVJlc29sdXRpb24iLCJjb25kaXRpb25TdWJncmFwaFZhbHVlUmVzb2x1dGlvbiIsInNvdXJjZSIsInJlc3VsdFZhbHVlQXJyYXkiLCJ0cmF2ZXJzZSIsIm5vZGVJbnN0YW5jZSIsImltcGxlbWVudGF0aW9uS2V5IiwicHJvY2Vzc05vZGUiLCJ0cmF2ZXJzYWxJbnRlcmNlcHRpb24iLCJhZ2dyZWdhdG9yIiwiZGVzdGluYXRpb24iLCJsZW5ndGgiLCJldmVyeSIsIml0ZW0iLCJCb29sZWFuIiwiY29uZGl0aW9uU3ViZ3JhcGhXaXRoTm9uQm9vbGVhblZhbHVlUmVzb2x1dGlvbiJdLCJtYXBwaW5ncyI6IndYQUFBOzs7O0FBSU8sZUFBZUEsWUFBZixDQUE0QixFQUFFQyxVQUFGLEVBQWNDLG1CQUFkLEVBQW1DQyxhQUFhLEdBQUcsS0FBbkQsRUFBMERDLFNBQVMsR0FBRyxJQUF0RSxFQUE1QixFQUEwRztBQUMvRyxRQUFNQyxLQUFLLEdBQUcsTUFBTSxZQUFBRCxTQUFTLENBQUNFLEtBQVYsQ0FBZ0JDLFFBQWhCLEVBQTBCSCxTQUFTLENBQUNFLEtBQVYsQ0FBZ0JDLFFBQWhCLENBQXlCQyxlQUFuRCxpQkFBbUUsRUFBRUMsTUFBTSxFQUFFUixVQUFVLENBQUNTLFFBQXJCLEVBQW5FLENBQXBCO0FBQ0EsTUFBSSxDQUFDTCxLQUFMLEVBQVk7O0FBRVosTUFBSU0sYUFBSjs7QUFFQSxVQUFRTixLQUFLLENBQUNPLFVBQU4sQ0FBaUJDLFVBQWpCLENBQTRCQyxjQUFwQzs7QUFFRSxTQUFLLG1CQUFMO0FBQ0UsVUFBSSxDQUFDWCxhQUFMO0FBQ0UsMkJBQU8sQ0FBQ0MsU0FBUyxDQUFDRSxLQUFWLENBQWdCQyxRQUFoQixDQUF5QlEsVUFBekIsQ0FBb0NWLEtBQXBDLENBQVIsRUFBcUQsZ0lBQXJEO0FBQ0ZNLE1BQUFBLGFBQWEsR0FBRyxNQUFpQlAsU0FBUyxDQUFDWSxvQkFBVixDQUErQkMsZUFBL0IsQ0FBK0NDLGdDQUExRCxNQUFBZCxTQUFTLEVBQWtGLEVBQUVDLEtBQUYsRUFBU0gsbUJBQVQsRUFBbEYsQ0FBL0I7QUFDQTtBQUNGLFNBQUssWUFBTDtBQUNFUyxNQUFBQSxhQUFhLEdBQUdOLEtBQUssQ0FBQ2MsTUFBTixDQUFhTixVQUE3QjtBQUNBO0FBQ0YsU0FBSyxNQUFMO0FBQ0VGLE1BQUFBLGFBQWEsR0FBR04sS0FBSyxDQUFDYyxNQUF0QjtBQUNBO0FBQ0YsU0FBSyxlQUFMO0FBQ0E7QUFDRVIsTUFBQUEsYUFBYSxHQUFHTixLQUFLLENBQUNjLE1BQU4sQ0FBYU4sVUFBYixDQUF3QlIsS0FBeEM7QUFDQSxZQWhCSjs7QUFrQkEsU0FBT00sYUFBUDtBQUNEOzs7Ozs7Ozs7Ozs7OztBQWNNLGVBQWVPLGdDQUFmLENBQWdELEVBQUViLEtBQUYsRUFBU0gsbUJBQVQsRUFBOEJFLFNBQVMsR0FBRyxJQUExQyxFQUFoRCxFQUFrRztBQUN2RyxNQUFJTyxhQUFKOzs7QUFHQSxNQUFJUyxnQkFBZ0IsR0FBRyxNQUFpQmhCLFNBQVMsQ0FBQ2lCLFFBQXJCLE1BQUFqQixTQUFTOzs7Ozs7QUFNcEM7QUFDRWtCLElBQUFBLFlBQVksRUFBRWpCLEtBQUssQ0FBQ2MsTUFEdEI7QUFFRUksSUFBQUEsaUJBQWlCLEVBQUU7QUFDakJDLE1BQUFBLFdBQVcsRUFBRSwwQkFESTtBQUVqQkMsTUFBQUEscUJBQXFCLEVBQUUsd0NBRk47QUFHakJDLE1BQUFBLFVBQVUsRUFBRSxxQkFISyxFQUZyQixFQU5vQzs7O0FBY3BDO0FBQ0V4QixJQUFBQSxtQkFBbUIsRUFBRTtBQUNuQkQsTUFBQUEsVUFBVSxFQUFHQyxtQkFBbUIsSUFBSUEsbUJBQW1CLENBQUNELFVBQTVDLElBQTJESSxLQUFLLENBQUNzQixXQUQxRCxFQUR2QixFQWRvQyxDQUF0Qzs7Ozs7QUFxQkEsTUFBSVAsZ0JBQWdCLENBQUNRLE1BQWpCLEdBQTBCLENBQTlCLEVBQWlDakIsYUFBYSxHQUFHUyxnQkFBZ0IsQ0FBQ1MsS0FBakIsQ0FBdUJDLElBQUksSUFBSUMsT0FBTyxDQUFDRCxJQUFELENBQXRDLENBQWhCLENBQWpDO0FBQ0ssTUFBSVYsZ0JBQWdCLENBQUNRLE1BQWpCLElBQTJCLENBQS9CLEVBQWtDakIsYUFBYSxHQUFHUyxnQkFBZ0IsQ0FBQyxDQUFELENBQWhDO0FBQ3ZDLFNBQU9ULGFBQVA7QUFDRDs7O0FBR00sZUFBZXFCLDhDQUFmLENBQThELEVBQUUzQixLQUFGLEVBQVNDLEtBQVQsRUFBZ0JKLG1CQUFoQixFQUE5RCxFQUFxRyxDQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnXG5cbi8vIFRPRE86IE1vdmUgb3RoZXIgbm9kZSBpbnN0cnVjdGlvbiBvdXRzaWRlIG9mIG5vZGUgdHlwZSBmdW5jdGlvbnMsIHRvIG1ha2UgYSBtb3JlIG1vZHVsYXIgaW5zdHJ1Y3Rpb24gZnVuY3Rpb25zLlxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVzb2x2ZVZhbHVlKHsgdGFyZ2V0Tm9kZSwgdHJhdmVyc2VDYWxsQ29udGV4dCwgYWxsb3dTZWxmRWRnZSA9IGZhbHNlLCB0cmF2ZXJzZXIgPSB0aGlzIH0pIHtcbiAgY29uc3QgdmFsdWUgPSBhd2FpdCB0cmF2ZXJzZXIuZ3JhcGguZGF0YWJhc2U6OnRyYXZlcnNlci5ncmFwaC5kYXRhYmFzZS5nZXRWYWx1ZUVsZW1lbnQoeyBub2RlSUQ6IHRhcmdldE5vZGUuaWRlbnRpdHkgfSlcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuXG5cbiAgbGV0IHJlc29sdmVkVmFsdWVcbiAgLyogcnVuIGNvbmRpdGlvbiBjaGVjayBhZ2FpbnN0IGNvbXBhcmlzb24gdmFsdWUuIEhpZXJhcmNoeSBvZiBjb21wYXJpc29uIHZhbHVlIGNhbGN1bGF0aW9uOiAgICovXG4gIHN3aXRjaCAodmFsdWUuY29ubmVjdGlvbi5wcm9wZXJ0aWVzLmltcGxlbWVudGF0aW9uKSB7XG4gICAgLy8gVE9ETzogY29uc2lkZXIgdXNpbmcgXCJTVUJHUkFQSFwiIGVkZ2UgdG8gY29ubmVjdCB0aGUgMiBzdWJncmFwaHMgLSBtYWluIGdyYXBoIChlLmcuIE1pZGRsZXdhcmUpIHdpdGggQ29uZGl0aW9uIGdyYXBoLlxuICAgIGNhc2UgJ2NvbmRpdGlvblN1YmdyYXBoJzpcbiAgICAgIGlmICghYWxsb3dTZWxmRWRnZSlcbiAgICAgICAgYXNzZXJ0KCF0cmF2ZXJzZXIuZ3JhcGguZGF0YWJhc2UuaXNTZWxmRWRnZSh2YWx1ZSksIGDigKIgU2VsZi1lZGdlIGZvciBWQUxVRSBjb25uZWN0aW9uIHdpdGggXCJjb25kaXRpb25TdWJncmFwaFwiIGltcGxlbWVudGF0aW9uLCBjdXJyZW50bHkgbm90IHN1cHBvcnRlZCwgYXMgaXQgY2F1c2VzIGluZmluaXRlIGxvb3AuYCkgLy8gVE9ETzogZGVhbCB3aXRoIGNpcmN1bGFyIHRyYXZlcnNhbCBmb3IgdGhpcyB0eXBlLlxuICAgICAgcmVzb2x2ZWRWYWx1ZSA9IGF3YWl0IHRyYXZlcnNlcjo6dHJhdmVyc2VyLnRyYXZlcnNlckluc3RydWN0aW9uLnZhbHVlUmVzb2x1dGlvbi5jb25kaXRpb25TdWJncmFwaFZhbHVlUmVzb2x1dGlvbih7IHZhbHVlLCB0cmF2ZXJzZUNhbGxDb250ZXh0IH0pXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3Byb3BlcnRpZXMnOlxuICAgICAgcmVzb2x2ZWRWYWx1ZSA9IHZhbHVlLnNvdXJjZS5wcm9wZXJ0aWVzXG4gICAgICBicmVha1xuICAgIGNhc2UgJ25vZGUnOlxuICAgICAgcmVzb2x2ZWRWYWx1ZSA9IHZhbHVlLnNvdXJjZVxuICAgICAgYnJlYWtcbiAgICBjYXNlICd2YWx1ZVByb3BlcnR5JzpcbiAgICBkZWZhdWx0OlxuICAgICAgcmVzb2x2ZWRWYWx1ZSA9IHZhbHVlLnNvdXJjZS5wcm9wZXJ0aWVzLnZhbHVlXG4gICAgICBicmVha1xuICB9XG4gIHJldHVybiByZXNvbHZlZFZhbHVlXG59XG5cbi8qXG4gICAgX19fXyAgICAgICAgICAgICAgICBfIF8gXyAgIF8gICAgICAgICAgICAgXG4gICAvIF9fX3xfX18gIF8gX18gICBfX3wgKF8pIHxfKF8pIF9fXyAgXyBfXyAgXG4gIHwgfCAgIC8gXyBcXHwgJ18gXFwgLyBfYCB8IHwgX198IHwvIF8gXFx8ICdfIFxcIFxuICB8IHxfX3wgKF8pIHwgfCB8IHwgKF98IHwgfCB8X3wgfCAoXykgfCB8IHwgfFxuICAgXFxfX19fXFxfX18vfF98IHxffFxcX18sX3xffFxcX198X3xcXF9fXy98X3wgfF98XG4gICBTZWxlY3RpdmUgLyBDb25kaXRpb25hbFxuKi9cbi8qKlxuICogQHJldHVybiB7Tm9kZSBPYmplY3R9IC0gYSBub2RlIG9iamVjdCBjb250YWluaW5nIGRhdGEuXG4gVGhlIGNvbmRpdGlvbiBzdWJncmFwaCByZXR1cm5zIGEgYm9vbGVhbiB2YWx1ZS5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNvbmRpdGlvblN1YmdyYXBoVmFsdWVSZXNvbHV0aW9uKHsgdmFsdWUsIHRyYXZlcnNlQ2FsbENvbnRleHQsIHRyYXZlcnNlciA9IHRoaXMgfSkge1xuICBsZXQgcmVzb2x2ZWRWYWx1ZVxuICAvLyBSdW4gcmVmZXJlbmNlIG5vZGUgaW4gYSBzZXBhcmF0ZSB0cmF2ZXJzYWwgcmVjdXJzaXZlIHNjb3BlcywgYW5kIHJldHVybiByZXN1bHQuXG4gIC8vIHRyYXZlcnNlIHRoZSBkZXN0aW5hdGlvbiBhbmQgZXh0cmFjdCBub2RlIGZyb20gdGhlIHJlc3VsdCB2YWx1ZS5cbiAgbGV0IHJlc3VsdFZhbHVlQXJyYXkgPSBhd2FpdCB0cmF2ZXJzZXI6OnRyYXZlcnNlci50cmF2ZXJzZShcbiAgICAvKiBUT0RPOiBOb3RlOiB0aGlzIGlzIGEgcXVpY2sgaW1wbGVtZW50YXRpb24gYmVjYXVzZSBkaWdnaW5nIGludG8gdGhlIGNvcmUgY29kZSBpcyB0aW1lIGNvbnN1bWluZywgdGhlIGRpZmZlcmVudCBjb25jZXB0cyB1c2VkIGluIGhlcmUgY291bGQgYmUgaW1wcm92ZWQgYW5kIGJ1aWx0IHVwb24gb3RoZXIgYWxyZWFkeSBleGlzdGluZyBjb25jZXB0czogXG4gICAgICAgICAgIFRPRE86IGNyZWF0ZSBhbiBpbnN0YW5jZSBncmFwaCBmcm9tIHRoZSBjdXJyZW50IGdyYXBoLCB0byBhbGxvdyBwYXNzaW5nIGFkZGl0aW9uYWwgY29udGV4dCBwYXJhbWV0cnMuXG4gICAgICAgICAgICAgICDigKIgJ3RyYXZlcnNhbENhbGxDb250ZXh0JyAtIHRoZSAybmQgcHJvdmlkZWQgYXJndW1lbnQgY291bGQgYmUgaW5zdGVhZCBhcHBsaWVkIGFzIGEgcmVndWxhciBDb250ZXh0IHNwZWNpZmljIGZvciB0aGUgY2FsbCwgYnkgY3JlYXRpbmcgYSBuZXcgZ3JhcGggY2hhaW4gd2l0aCBpdCdzIHVuaXF1ZSBjb250ZXh0LCBpbiBhZGRpdGlvbiB0byB0aGUgYWxyZWFkeSBleGlzdGluZyBjb250ZXh0IGluc3RhbmNlLlxuICAgICAgICAgICB3YXMgdGhpcyBkb25lID8gfn7igKIgQ29uZGl0aW9uQWdncmVnYXRvciAmIHRyYXZlcnNlVGhlblByb2Nlc3NXaXRoTG9naWNhbE9wZXJhdG9yIGltcGxlbWVudGF0aW9ucyBjb3VsZCBiZSBpbnRlZ3JhdHRlZCBpbnRvIHRoZSBvdGhlciBpbXBsZW1lbnRhdGlvbnMufn5cbiAgICAgICAgICovXG4gICAge1xuICAgICAgbm9kZUluc3RhbmNlOiB2YWx1ZS5zb3VyY2UsXG4gICAgICBpbXBsZW1lbnRhdGlvbktleToge1xuICAgICAgICBwcm9jZXNzTm9kZTogJ2V4ZWN1dGVGdW5jdGlvblJlZmVyZW5jZScsIC8vIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gZm9yIHByb2Nlc3Npbmcgc3RhZ2VzIGluIGNvbmRpdGlvbiBncmFwaC5cbiAgICAgICAgdHJhdmVyc2FsSW50ZXJjZXB0aW9uOiAndHJhdmVyc2VUaGVuUHJvY2Vzc1dpdGhMb2dpY2FsT3BlcmF0b3InLFxuICAgICAgICBhZ2dyZWdhdG9yOiAnQ29uZGl0aW9uQWdncmVnYXRvcicsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgdHJhdmVyc2VDYWxsQ29udGV4dDoge1xuICAgICAgICB0YXJnZXROb2RlOiAodHJhdmVyc2VDYWxsQ29udGV4dCAmJiB0cmF2ZXJzZUNhbGxDb250ZXh0LnRhcmdldE5vZGUpIHx8IHZhbHVlLmRlc3RpbmF0aW9uLCAvLyBwYXNzIHRoZSBub2RlIHJlcXVlc3RpbmcgdGhlIHJlc29sdXRpb24gb2YgdGhlIHJlcm91dGUgbm9kZSBpZiBpdCBleGlzdHMsIG9yIHRoZSByZXJvdXRlIGl0c2VsZiBpbiBjYXNlIGNhbGxlZCBhcyByb290IGxldmVsIGluIHRoZSB0cmF2ZXJzYWwuXG4gICAgICB9LFxuICAgIH0sXG4gICkgLy8gdHJhdmVyc2Ugc3ViZ3JhcGggdG8gcmV0cmlldmUgYSByZWZlcmVuY2VkIG5vZGUuXG5cbiAgaWYgKHJlc3VsdFZhbHVlQXJyYXkubGVuZ3RoID4gMSkgcmVzb2x2ZWRWYWx1ZSA9IHJlc3VsdFZhbHVlQXJyYXkuZXZlcnkoaXRlbSA9PiBCb29sZWFuKGl0ZW0pKVxuICBlbHNlIGlmIChyZXN1bHRWYWx1ZUFycmF5Lmxlbmd0aCAhPSAwKSByZXNvbHZlZFZhbHVlID0gcmVzdWx0VmFsdWVBcnJheVswXVxuICByZXR1cm4gcmVzb2x2ZWRWYWx1ZVxufVxuXG4vLyBUT0RPOiBjb25kaXRpb24gc3ViZ3JhcGggdGhhdCByZXR1cm5zIG5vbi1ib29sZWFuLCBmdW5jdGlvbnMgZm9yIG1ha2luZyBjb21wbGV4IGNvbmRpdGlvbiBjaGVja3MuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29uZGl0aW9uU3ViZ3JhcGhXaXRoTm9uQm9vbGVhblZhbHVlUmVzb2x1dGlvbih7IHZhbHVlLCBncmFwaCwgdHJhdmVyc2VDYWxsQ29udGV4dCB9KSB7fVxuIl19