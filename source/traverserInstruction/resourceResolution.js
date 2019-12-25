"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports, "__esModule", { value: true });exports.resolveResource = resolveResource;exports.applicationReference = applicationReference;var _assert = _interopRequireDefault(require("assert"));




async function resolveResource({ targetNode, graph, contextPropertyName = 'referenceContext' }) {
  let referenceContext = graph.context[contextPropertyName];
  (0, _assert.default)(referenceContext, `• Context "${contextPropertyName}" variable is required to reference functions from graph database strings.`);

  let resource;
  const { resourceArray } = await graph.databaseWrapper.getResource({ concreteDatabase: graph.database, nodeID: targetNode.identity });
  if (resourceArray.length > 1) throw new Error(`• Multiple resource relationships are not supported for Process node.`);else
  if (resourceArray.length == 0) return;else
  resource = resourceArray[0];

  let resolvedResource;
  switch (resource.connection.properties.context) {
    case 'filesystemReference':
      throw new Error('• filesystemReference is not implemented in resource resolution functionality.');
      break;
    case 'applicationReference':
    default:
      resolvedResource = await graph.traverserInstruction.resourceResolution.applicationReference({ graph, targetNode: resource.source, referenceContext });
      break;}


  return resolvedResource;
}

async function applicationReference({ targetNode, graph, referenceContext }) {
  if (targetNode.labels.includes(graph.schemeReference.nodeLabel.function)) {
    let referenceKey = targetNode.properties.functionName || function (e) {throw e;}(new Error(`• function resource must have a "functionName" - ${targetNode.properties.functionName}`));

    let functionCallback = referenceContext[referenceKey] || function (e) {throw e;}(new Error(`• reference function name "${referenceKey}" doesn't exist in graph context.`));
    return functionCallback;
  } else if (targetNode.labels.includes(graph.schemeReference.nodeLabel.file)) {
    let referenceKey = targetNode.properties.referenceKey || function (e) {throw e;}(new Error(`• resource File node (with key: ${targetNode.properties.key}) must have "referenceKey" property.`));
    let filePath = referenceContext[referenceKey] || function (e) {throw e;}(new Error(`• File reference key "${referenceKey}" doesn't exist in graph context.`));
    return filePath;
  } else throw new Error(`• Unsupported Node type for resource connection.`);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS90cmF2ZXJzZXJJbnN0cnVjdGlvbi9yZXNvdXJjZVJlc29sdXRpb24uanMiXSwibmFtZXMiOlsicmVzb2x2ZVJlc291cmNlIiwidGFyZ2V0Tm9kZSIsImdyYXBoIiwiY29udGV4dFByb3BlcnR5TmFtZSIsInJlZmVyZW5jZUNvbnRleHQiLCJjb250ZXh0IiwicmVzb3VyY2UiLCJyZXNvdXJjZUFycmF5IiwiZGF0YWJhc2VXcmFwcGVyIiwiZ2V0UmVzb3VyY2UiLCJjb25jcmV0ZURhdGFiYXNlIiwiZGF0YWJhc2UiLCJub2RlSUQiLCJpZGVudGl0eSIsImxlbmd0aCIsIkVycm9yIiwicmVzb2x2ZWRSZXNvdXJjZSIsImNvbm5lY3Rpb24iLCJwcm9wZXJ0aWVzIiwidHJhdmVyc2VySW5zdHJ1Y3Rpb24iLCJyZXNvdXJjZVJlc29sdXRpb24iLCJhcHBsaWNhdGlvblJlZmVyZW5jZSIsInNvdXJjZSIsImxhYmVscyIsImluY2x1ZGVzIiwic2NoZW1lUmVmZXJlbmNlIiwibm9kZUxhYmVsIiwiZnVuY3Rpb24iLCJyZWZlcmVuY2VLZXkiLCJmdW5jdGlvbk5hbWUiLCJmdW5jdGlvbkNhbGxiYWNrIiwiZmlsZSIsImtleSIsImZpbGVQYXRoIl0sIm1hcHBpbmdzIjoiOFBBQUE7Ozs7O0FBS08sZUFBZUEsZUFBZixDQUErQixFQUFFQyxVQUFGLEVBQWNDLEtBQWQsRUFBcUJDLG1CQUFtQixHQUFHLGtCQUEzQyxFQUEvQixFQUFnRztBQUNyRyxNQUFJQyxnQkFBZ0IsR0FBR0YsS0FBSyxDQUFDRyxPQUFOLENBQWNGLG1CQUFkLENBQXZCO0FBQ0EsdUJBQU9DLGdCQUFQLEVBQTBCLGNBQWFELG1CQUFvQiw0RUFBM0Q7O0FBRUEsTUFBSUcsUUFBSjtBQUNBLFFBQU0sRUFBRUMsYUFBRixLQUFvQixNQUFNTCxLQUFLLENBQUNNLGVBQU4sQ0FBc0JDLFdBQXRCLENBQWtDLEVBQUVDLGdCQUFnQixFQUFFUixLQUFLLENBQUNTLFFBQTFCLEVBQW9DQyxNQUFNLEVBQUVYLFVBQVUsQ0FBQ1ksUUFBdkQsRUFBbEMsQ0FBaEM7QUFDQSxNQUFJTixhQUFhLENBQUNPLE1BQWQsR0FBdUIsQ0FBM0IsRUFBOEIsTUFBTSxJQUFJQyxLQUFKLENBQVcsdUVBQVgsQ0FBTixDQUE5QjtBQUNLLE1BQUlSLGFBQWEsQ0FBQ08sTUFBZCxJQUF3QixDQUE1QixFQUErQixPQUEvQjtBQUNBUixFQUFBQSxRQUFRLEdBQUdDLGFBQWEsQ0FBQyxDQUFELENBQXhCOztBQUVMLE1BQUlTLGdCQUFKO0FBQ0EsVUFBUVYsUUFBUSxDQUFDVyxVQUFULENBQW9CQyxVQUFwQixDQUErQmIsT0FBdkM7QUFDRSxTQUFLLHFCQUFMO0FBQ0UsWUFBTSxJQUFJVSxLQUFKLENBQVUsZ0ZBQVYsQ0FBTjtBQUNBO0FBQ0YsU0FBSyxzQkFBTDtBQUNBO0FBQ0VDLE1BQUFBLGdCQUFnQixHQUFHLE1BQU1kLEtBQUssQ0FBQ2lCLG9CQUFOLENBQTJCQyxrQkFBM0IsQ0FBOENDLG9CQUE5QyxDQUFtRSxFQUFFbkIsS0FBRixFQUFTRCxVQUFVLEVBQUVLLFFBQVEsQ0FBQ2dCLE1BQTlCLEVBQXNDbEIsZ0JBQXRDLEVBQW5FLENBQXpCO0FBQ0EsWUFQSjs7O0FBVUEsU0FBT1ksZ0JBQVA7QUFDRDs7QUFFTSxlQUFlSyxvQkFBZixDQUFvQyxFQUFFcEIsVUFBRixFQUFjQyxLQUFkLEVBQXFCRSxnQkFBckIsRUFBcEMsRUFBNkU7QUFDbEYsTUFBSUgsVUFBVSxDQUFDc0IsTUFBWCxDQUFrQkMsUUFBbEIsQ0FBMkJ0QixLQUFLLENBQUN1QixlQUFOLENBQXNCQyxTQUF0QixDQUFnQ0MsUUFBM0QsQ0FBSixFQUEwRTtBQUN4RSxRQUFJQyxZQUFZLEdBQUczQixVQUFVLENBQUNpQixVQUFYLENBQXNCVyxZQUF0Qiw0QkFBNEMsSUFBSWQsS0FBSixDQUFXLG9EQUFtRGQsVUFBVSxDQUFDaUIsVUFBWCxDQUFzQlcsWUFBYSxFQUFqRyxDQUE1QyxDQUFuQjs7QUFFQSxRQUFJQyxnQkFBZ0IsR0FBRzFCLGdCQUFnQixDQUFDd0IsWUFBRCxDQUFoQiw0QkFBd0MsSUFBSWIsS0FBSixDQUFXLDhCQUE2QmEsWUFBYSxtQ0FBckQsQ0FBeEMsQ0FBdkI7QUFDQSxXQUFPRSxnQkFBUDtBQUNELEdBTEQsTUFLTyxJQUFJN0IsVUFBVSxDQUFDc0IsTUFBWCxDQUFrQkMsUUFBbEIsQ0FBMkJ0QixLQUFLLENBQUN1QixlQUFOLENBQXNCQyxTQUF0QixDQUFnQ0ssSUFBM0QsQ0FBSixFQUFzRTtBQUMzRSxRQUFJSCxZQUFZLEdBQUczQixVQUFVLENBQUNpQixVQUFYLENBQXNCVSxZQUF0Qiw0QkFBNEMsSUFBSWIsS0FBSixDQUFXLG1DQUFrQ2QsVUFBVSxDQUFDaUIsVUFBWCxDQUFzQmMsR0FBSSxzQ0FBdkUsQ0FBNUMsQ0FBbkI7QUFDQSxRQUFJQyxRQUFRLEdBQUc3QixnQkFBZ0IsQ0FBQ3dCLFlBQUQsQ0FBaEIsNEJBQXdDLElBQUliLEtBQUosQ0FBVyx5QkFBd0JhLFlBQWEsbUNBQWhELENBQXhDLENBQWY7QUFDQSxXQUFPSyxRQUFQO0FBQ0QsR0FKTSxNQUlBLE1BQU0sSUFBSWxCLEtBQUosQ0FBVyxrREFBWCxDQUFOO0FBQ1IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCdcblxuLyoqXG4gKiAgQHBhcmFtIGNvbnRleHRQcm9wZXJ0eU5hbWUgVE9ETzogY29uc2lkZXIgdXNpbmcgU3ltYm9scyBpbnN0ZWFkIG9mIHN0cmluZyBrZXlzIGFuZCBleHBvcnQgdGhlbSBmb3IgY2xpZW50IHVzYWdlLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVzb2x2ZVJlc291cmNlKHsgdGFyZ2V0Tm9kZSwgZ3JhcGgsIGNvbnRleHRQcm9wZXJ0eU5hbWUgPSAncmVmZXJlbmNlQ29udGV4dCcgfSkge1xuICBsZXQgcmVmZXJlbmNlQ29udGV4dCA9IGdyYXBoLmNvbnRleHRbY29udGV4dFByb3BlcnR5TmFtZV1cbiAgYXNzZXJ0KHJlZmVyZW5jZUNvbnRleHQsIGDigKIgQ29udGV4dCBcIiR7Y29udGV4dFByb3BlcnR5TmFtZX1cIiB2YXJpYWJsZSBpcyByZXF1aXJlZCB0byByZWZlcmVuY2UgZnVuY3Rpb25zIGZyb20gZ3JhcGggZGF0YWJhc2Ugc3RyaW5ncy5gKVxuXG4gIGxldCByZXNvdXJjZVxuICBjb25zdCB7IHJlc291cmNlQXJyYXkgfSA9IGF3YWl0IGdyYXBoLmRhdGFiYXNlV3JhcHBlci5nZXRSZXNvdXJjZSh7IGNvbmNyZXRlRGF0YWJhc2U6IGdyYXBoLmRhdGFiYXNlLCBub2RlSUQ6IHRhcmdldE5vZGUuaWRlbnRpdHkgfSlcbiAgaWYgKHJlc291cmNlQXJyYXkubGVuZ3RoID4gMSkgdGhyb3cgbmV3IEVycm9yKGDigKIgTXVsdGlwbGUgcmVzb3VyY2UgcmVsYXRpb25zaGlwcyBhcmUgbm90IHN1cHBvcnRlZCBmb3IgUHJvY2VzcyBub2RlLmApXG4gIGVsc2UgaWYgKHJlc291cmNlQXJyYXkubGVuZ3RoID09IDApIHJldHVyblxuICBlbHNlIHJlc291cmNlID0gcmVzb3VyY2VBcnJheVswXVxuXG4gIGxldCByZXNvbHZlZFJlc291cmNlXG4gIHN3aXRjaCAocmVzb3VyY2UuY29ubmVjdGlvbi5wcm9wZXJ0aWVzLmNvbnRleHQpIHtcbiAgICBjYXNlICdmaWxlc3lzdGVtUmVmZXJlbmNlJzpcbiAgICAgIHRocm93IG5ldyBFcnJvcign4oCiIGZpbGVzeXN0ZW1SZWZlcmVuY2UgaXMgbm90IGltcGxlbWVudGVkIGluIHJlc291cmNlIHJlc29sdXRpb24gZnVuY3Rpb25hbGl0eS4nKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdhcHBsaWNhdGlvblJlZmVyZW5jZSc6XG4gICAgZGVmYXVsdDpcbiAgICAgIHJlc29sdmVkUmVzb3VyY2UgPSBhd2FpdCBncmFwaC50cmF2ZXJzZXJJbnN0cnVjdGlvbi5yZXNvdXJjZVJlc29sdXRpb24uYXBwbGljYXRpb25SZWZlcmVuY2UoeyBncmFwaCwgdGFyZ2V0Tm9kZTogcmVzb3VyY2Uuc291cmNlLCByZWZlcmVuY2VDb250ZXh0IH0pXG4gICAgICBicmVha1xuICB9XG5cbiAgcmV0dXJuIHJlc29sdmVkUmVzb3VyY2Vcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFwcGxpY2F0aW9uUmVmZXJlbmNlKHsgdGFyZ2V0Tm9kZSwgZ3JhcGgsIHJlZmVyZW5jZUNvbnRleHQgfSkge1xuICBpZiAodGFyZ2V0Tm9kZS5sYWJlbHMuaW5jbHVkZXMoZ3JhcGguc2NoZW1lUmVmZXJlbmNlLm5vZGVMYWJlbC5mdW5jdGlvbikpIHtcbiAgICBsZXQgcmVmZXJlbmNlS2V5ID0gdGFyZ2V0Tm9kZS5wcm9wZXJ0aWVzLmZ1bmN0aW9uTmFtZSB8fCB0aHJvdyBuZXcgRXJyb3IoYOKAoiBmdW5jdGlvbiByZXNvdXJjZSBtdXN0IGhhdmUgYSBcImZ1bmN0aW9uTmFtZVwiIC0gJHt0YXJnZXROb2RlLnByb3BlcnRpZXMuZnVuY3Rpb25OYW1lfWApXG4gICAgLy8gYSBmdW5jdGlvbiB0aGF0IGNvbXBsaWVzIHdpdGggZ3JhcGhUcmF2ZXJzYWwgcHJvY2Vzc0RhdGEgaW1wbGVtZW50YXRpb24uXG4gICAgbGV0IGZ1bmN0aW9uQ2FsbGJhY2sgPSByZWZlcmVuY2VDb250ZXh0W3JlZmVyZW5jZUtleV0gfHwgdGhyb3cgbmV3IEVycm9yKGDigKIgcmVmZXJlbmNlIGZ1bmN0aW9uIG5hbWUgXCIke3JlZmVyZW5jZUtleX1cIiBkb2Vzbid0IGV4aXN0IGluIGdyYXBoIGNvbnRleHQuYClcbiAgICByZXR1cm4gZnVuY3Rpb25DYWxsYmFja1xuICB9IGVsc2UgaWYgKHRhcmdldE5vZGUubGFiZWxzLmluY2x1ZGVzKGdyYXBoLnNjaGVtZVJlZmVyZW5jZS5ub2RlTGFiZWwuZmlsZSkpIHtcbiAgICBsZXQgcmVmZXJlbmNlS2V5ID0gdGFyZ2V0Tm9kZS5wcm9wZXJ0aWVzLnJlZmVyZW5jZUtleSB8fCB0aHJvdyBuZXcgRXJyb3IoYOKAoiByZXNvdXJjZSBGaWxlIG5vZGUgKHdpdGgga2V5OiAke3RhcmdldE5vZGUucHJvcGVydGllcy5rZXl9KSBtdXN0IGhhdmUgXCJyZWZlcmVuY2VLZXlcIiBwcm9wZXJ0eS5gKVxuICAgIGxldCBmaWxlUGF0aCA9IHJlZmVyZW5jZUNvbnRleHRbcmVmZXJlbmNlS2V5XSB8fCB0aHJvdyBuZXcgRXJyb3IoYOKAoiBGaWxlIHJlZmVyZW5jZSBrZXkgXCIke3JlZmVyZW5jZUtleX1cIiBkb2Vzbid0IGV4aXN0IGluIGdyYXBoIGNvbnRleHQuYClcbiAgICByZXR1cm4gZmlsZVBhdGhcbiAgfSBlbHNlIHRocm93IG5ldyBFcnJvcihg4oCiIFVuc3VwcG9ydGVkIE5vZGUgdHlwZSBmb3IgcmVzb3VyY2UgY29ubmVjdGlvbi5gKVxufVxuIl19