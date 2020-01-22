"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.executeEdge = executeEdge;


async function executeEdge({ stageNode, nextProcessData, getImplementation }, { additionalParameter, traverseCallContext }) {var _context;
  let execute;
  const { executeArray } = await (_context = this.graph.database, this.graph.database.getExecution).call(_context, { nodeID: stageNode.identity });
  if (executeArray.length > 1) throw new Error(`• Multiple execute relationships are not supported in Stage node.`);else

    if (executeArray.length == 0) return null;else
    execute = executeArray[0];


  let implementation = getImplementation(execute.connection.properties.implementation);
  let processResult = await implementation.call(this, { processNode: execute.destination, stageNode, nextProcessData }, { additionalParameter, traverseCallContext });


  processResult = await this.traverserInstruction.pipeProcess.pipeProcessing({ targetNode: execute.destination, processResult, traverser: this });

  return processResult;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NvdXJjZS9jb25zdHJ1Y3RhYmxlL1RyYXZlcnNlci9tZXRob2QvZXhlY3V0ZUVkZ2UuanMiXSwibmFtZXMiOlsiZXhlY3V0ZUVkZ2UiLCJzdGFnZU5vZGUiLCJuZXh0UHJvY2Vzc0RhdGEiLCJnZXRJbXBsZW1lbnRhdGlvbiIsImFkZGl0aW9uYWxQYXJhbWV0ZXIiLCJ0cmF2ZXJzZUNhbGxDb250ZXh0IiwiZXhlY3V0ZSIsImV4ZWN1dGVBcnJheSIsImdyYXBoIiwiZGF0YWJhc2UiLCJnZXRFeGVjdXRpb24iLCJub2RlSUQiLCJpZGVudGl0eSIsImxlbmd0aCIsIkVycm9yIiwiaW1wbGVtZW50YXRpb24iLCJjb25uZWN0aW9uIiwicHJvcGVydGllcyIsInByb2Nlc3NSZXN1bHQiLCJwcm9jZXNzTm9kZSIsImRlc3RpbmF0aW9uIiwidHJhdmVyc2VySW5zdHJ1Y3Rpb24iLCJwaXBlUHJvY2VzcyIsInBpcGVQcm9jZXNzaW5nIiwidGFyZ2V0Tm9kZSIsInRyYXZlcnNlciJdLCJtYXBwaW5ncyI6Ijs7O0FBR08sZUFBZUEsV0FBZixDQUEyQixFQUFFQyxTQUFGLEVBQWFDLGVBQWIsRUFBOEJDLGlCQUE5QixFQUEzQixFQUE4RSxFQUFFQyxtQkFBRixFQUF1QkMsbUJBQXZCLEVBQTlFLEVBQTRIO0FBQ2pJLE1BQUlDLE9BQUo7QUFDQSxRQUFNLEVBQUVDLFlBQUYsS0FBbUIsTUFBTSxpQkFBS0MsS0FBTCxDQUFXQyxRQUFYLEVBQXFCLEtBQUtELEtBQUwsQ0FBV0MsUUFBWCxDQUFvQkMsWUFBekMsaUJBQXNELEVBQUVDLE1BQU0sRUFBRVYsU0FBUyxDQUFDVyxRQUFwQixFQUF0RCxDQUEvQjtBQUNBLE1BQUlMLFlBQVksQ0FBQ00sTUFBYixHQUFzQixDQUExQixFQUE2QixNQUFNLElBQUlDLEtBQUosQ0FBVyxtRUFBWCxDQUFOLENBQTdCOztBQUVLLFFBQUlQLFlBQVksQ0FBQ00sTUFBYixJQUF1QixDQUEzQixFQUE4QixPQUFPLElBQVAsQ0FBOUI7QUFDQVAsSUFBQUEsT0FBTyxHQUFHQyxZQUFZLENBQUMsQ0FBRCxDQUF0Qjs7O0FBR0wsTUFBSVEsY0FBYyxHQUFHWixpQkFBaUIsQ0FBQ0csT0FBTyxDQUFDVSxVQUFSLENBQW1CQyxVQUFuQixDQUE4QkYsY0FBL0IsQ0FBdEM7QUFDQSxNQUFJRyxhQUFhLEdBQUcsTUFBWUgsY0FBTixZQUFxQixFQUFFSSxXQUFXLEVBQUViLE9BQU8sQ0FBQ2MsV0FBdkIsRUFBb0NuQixTQUFwQyxFQUErQ0MsZUFBL0MsRUFBckIsRUFBdUYsRUFBRUUsbUJBQUYsRUFBdUJDLG1CQUF2QixFQUF2RixDQUExQjs7O0FBR0FhLEVBQUFBLGFBQWEsR0FBRyxNQUFNLEtBQUtHLG9CQUFMLENBQTBCQyxXQUExQixDQUFzQ0MsY0FBdEMsQ0FBcUQsRUFBRUMsVUFBVSxFQUFFbEIsT0FBTyxDQUFDYyxXQUF0QixFQUFtQ0YsYUFBbkMsRUFBa0RPLFNBQVMsRUFBRSxJQUE3RCxFQUFyRCxDQUF0Qjs7QUFFQSxTQUFPUCxhQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCdcblxuLy8gUmVzcG9uc2libGUgZm9yIHByb2Nlc3NpbmcgZGF0YS5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGVjdXRlRWRnZSh7IHN0YWdlTm9kZSwgbmV4dFByb2Nlc3NEYXRhLCBnZXRJbXBsZW1lbnRhdGlvbiB9LCB7IGFkZGl0aW9uYWxQYXJhbWV0ZXIsIHRyYXZlcnNlQ2FsbENvbnRleHQgfSkge1xuICBsZXQgZXhlY3V0ZVxuICBjb25zdCB7IGV4ZWN1dGVBcnJheSB9ID0gYXdhaXQgdGhpcy5ncmFwaC5kYXRhYmFzZTo6dGhpcy5ncmFwaC5kYXRhYmFzZS5nZXRFeGVjdXRpb24oeyBub2RlSUQ6IHN0YWdlTm9kZS5pZGVudGl0eSB9KVxuICBpZiAoZXhlY3V0ZUFycmF5Lmxlbmd0aCA+IDEpIHRocm93IG5ldyBFcnJvcihg4oCiIE11bHRpcGxlIGV4ZWN1dGUgcmVsYXRpb25zaGlwcyBhcmUgbm90IHN1cHBvcnRlZCBpbiBTdGFnZSBub2RlLmApXG4gIC8vIHNraXAgaWYgbm8gZXhlY3V0ZSBjb25uZWN0aW9uXG4gIGVsc2UgaWYgKGV4ZWN1dGVBcnJheS5sZW5ndGggPT0gMCkgcmV0dXJuIG51bGxcbiAgZWxzZSBleGVjdXRlID0gZXhlY3V0ZUFycmF5WzBdXG5cbiAgLy8gRXhlY3V0ZSBub2RlIGRhdGFJdGVtXG4gIGxldCBpbXBsZW1lbnRhdGlvbiA9IGdldEltcGxlbWVudGF0aW9uKGV4ZWN1dGUuY29ubmVjdGlvbi5wcm9wZXJ0aWVzLmltcGxlbWVudGF0aW9uKSAvLyBub2RlL2VkZ2UgcHJvcGVydGllcyBpbXBsZW1lbnRhdGlvbiBoaWVyYXJjaHkgLSBjYWxjdWxhdGUgYW5kIHBpY2sgY29ycmVjdCBpbXBsZW1lbnRhdGlvbiBhY2NvcmRpbmcgdG8gcGFyYW1ldGVyIGhpZXJhcmNoeS5cbiAgbGV0IHByb2Nlc3NSZXN1bHQgPSBhd2FpdCB0aGlzOjppbXBsZW1lbnRhdGlvbih7IHByb2Nlc3NOb2RlOiBleGVjdXRlLmRlc3RpbmF0aW9uLCBzdGFnZU5vZGUsIG5leHRQcm9jZXNzRGF0YSB9LCB7IGFkZGl0aW9uYWxQYXJhbWV0ZXIsIHRyYXZlcnNlQ2FsbENvbnRleHQgfSlcblxuICAvLyBmdXJ0aGVyIHByb2Nlc3NpbmcgZnJvbSBwaXBlIHByb2Nlc3Mgbm9kZXM6XG4gIHByb2Nlc3NSZXN1bHQgPSBhd2FpdCB0aGlzLnRyYXZlcnNlckluc3RydWN0aW9uLnBpcGVQcm9jZXNzLnBpcGVQcm9jZXNzaW5nKHsgdGFyZ2V0Tm9kZTogZXhlY3V0ZS5kZXN0aW5hdGlvbiwgcHJvY2Vzc1Jlc3VsdCwgdHJhdmVyc2VyOiB0aGlzIH0pXG5cbiAgcmV0dXJuIHByb2Nlc3NSZXN1bHRcbn1cbiJdfQ==