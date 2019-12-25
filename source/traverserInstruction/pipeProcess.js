"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.pipeProcessing = pipeProcessing;
async function pipeProcessing({ targetNode, processResult, graph }) {

  let pipe;
  const { pipeArray } = await graph.databaseWrapper.getPipe({ concreteDatabase: graph.database, nodeID: targetNode.identity });
  if (pipeArray.length > 1) throw new Error(`• Multiple pipe relationships are not supported in Processs node.`);else

    if (pipeArray.length == 0) return processResult;else
    pipe = pipeArray[0];

  let pipeResult = processResult;

  let functionCallback = await graph.traverserInstruction.resourceResolution.resolveResource({ targetNode: pipe.destination, graph, contextPropertyName: 'functionReferenceContext' });
  if (functionCallback) {
    let pipeFunction = await functionCallback({ node: pipe.destination, graph });
    pipeResult = pipeFunction(processResult);
  }


  pipeResult = pipeProcessing({ targetNode: pipe.destination, processResult: pipeResult, graph });

  return pipeResult;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS90cmF2ZXJzZXJJbnN0cnVjdGlvbi9waXBlUHJvY2Vzcy5qcyJdLCJuYW1lcyI6WyJwaXBlUHJvY2Vzc2luZyIsInRhcmdldE5vZGUiLCJwcm9jZXNzUmVzdWx0IiwiZ3JhcGgiLCJwaXBlIiwicGlwZUFycmF5IiwiZGF0YWJhc2VXcmFwcGVyIiwiZ2V0UGlwZSIsImNvbmNyZXRlRGF0YWJhc2UiLCJkYXRhYmFzZSIsIm5vZGVJRCIsImlkZW50aXR5IiwibGVuZ3RoIiwiRXJyb3IiLCJwaXBlUmVzdWx0IiwiZnVuY3Rpb25DYWxsYmFjayIsInRyYXZlcnNlckluc3RydWN0aW9uIiwicmVzb3VyY2VSZXNvbHV0aW9uIiwicmVzb2x2ZVJlc291cmNlIiwiZGVzdGluYXRpb24iLCJjb250ZXh0UHJvcGVydHlOYW1lIiwicGlwZUZ1bmN0aW9uIiwibm9kZSJdLCJtYXBwaW5ncyI6IjtBQUNPLGVBQWVBLGNBQWYsQ0FBOEIsRUFBRUMsVUFBRixFQUFjQyxhQUFkLEVBQTZCQyxLQUE3QixFQUE5QixFQUFvRTs7QUFFekUsTUFBSUMsSUFBSjtBQUNBLFFBQU0sRUFBRUMsU0FBRixLQUFnQixNQUFNRixLQUFLLENBQUNHLGVBQU4sQ0FBc0JDLE9BQXRCLENBQThCLEVBQUVDLGdCQUFnQixFQUFFTCxLQUFLLENBQUNNLFFBQTFCLEVBQW9DQyxNQUFNLEVBQUVULFVBQVUsQ0FBQ1UsUUFBdkQsRUFBOUIsQ0FBNUI7QUFDQSxNQUFJTixTQUFTLENBQUNPLE1BQVYsR0FBbUIsQ0FBdkIsRUFBMEIsTUFBTSxJQUFJQyxLQUFKLENBQVcsbUVBQVgsQ0FBTixDQUExQjs7QUFFSyxRQUFJUixTQUFTLENBQUNPLE1BQVYsSUFBb0IsQ0FBeEIsRUFBMkIsT0FBT1YsYUFBUCxDQUEzQjtBQUNBRSxJQUFBQSxJQUFJLEdBQUdDLFNBQVMsQ0FBQyxDQUFELENBQWhCOztBQUVMLE1BQUlTLFVBQVUsR0FBR1osYUFBakI7O0FBRUEsTUFBSWEsZ0JBQWdCLEdBQUcsTUFBTVosS0FBSyxDQUFDYSxvQkFBTixDQUEyQkMsa0JBQTNCLENBQThDQyxlQUE5QyxDQUE4RCxFQUFFakIsVUFBVSxFQUFFRyxJQUFJLENBQUNlLFdBQW5CLEVBQWdDaEIsS0FBaEMsRUFBdUNpQixtQkFBbUIsRUFBRSwwQkFBNUQsRUFBOUQsQ0FBN0I7QUFDQSxNQUFJTCxnQkFBSixFQUFzQjtBQUNwQixRQUFJTSxZQUFZLEdBQUcsTUFBTU4sZ0JBQWdCLENBQUMsRUFBRU8sSUFBSSxFQUFFbEIsSUFBSSxDQUFDZSxXQUFiLEVBQTBCaEIsS0FBMUIsRUFBRCxDQUF6QztBQUNBVyxJQUFBQSxVQUFVLEdBQUdPLFlBQVksQ0FBQ25CLGFBQUQsQ0FBekI7QUFDRDs7O0FBR0RZLEVBQUFBLFVBQVUsR0FBR2QsY0FBYyxDQUFDLEVBQUVDLFVBQVUsRUFBRUcsSUFBSSxDQUFDZSxXQUFuQixFQUFnQ2pCLGFBQWEsRUFBRVksVUFBL0MsRUFBMkRYLEtBQTNELEVBQUQsQ0FBM0I7O0FBRUEsU0FBT1csVUFBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gcG9zdCByZW5kZXJpbmcgcHJvY2Vzc2luZyBhbGdvcml0aG1zLCB3aGVuIHJlcXVpcmVkIGUuZy4gZnVydGhlciBwcm9jZXNzaW5nIG9mIHJlbmRyZWQgdGVtcGxhdGVzXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcGlwZVByb2Nlc3NpbmcoeyB0YXJnZXROb2RlLCBwcm9jZXNzUmVzdWx0LCBncmFwaCB9KSB7XG4gIC8vIGdldCBwaXBlIGVkZ2VcbiAgbGV0IHBpcGVcbiAgY29uc3QgeyBwaXBlQXJyYXkgfSA9IGF3YWl0IGdyYXBoLmRhdGFiYXNlV3JhcHBlci5nZXRQaXBlKHsgY29uY3JldGVEYXRhYmFzZTogZ3JhcGguZGF0YWJhc2UsIG5vZGVJRDogdGFyZ2V0Tm9kZS5pZGVudGl0eSB9KVxuICBpZiAocGlwZUFycmF5Lmxlbmd0aCA+IDEpIHRocm93IG5ldyBFcnJvcihg4oCiIE11bHRpcGxlIHBpcGUgcmVsYXRpb25zaGlwcyBhcmUgbm90IHN1cHBvcnRlZCBpbiBQcm9jZXNzcyBub2RlLmApXG4gIC8vIHNraXAgaWYgbm8gcGlwZSBjb25uZWN0aW9uIC0gcmV0dXJuIHZhbHVlIHdpdGhvdXQgY2hhbmdlXG4gIGVsc2UgaWYgKHBpcGVBcnJheS5sZW5ndGggPT0gMCkgcmV0dXJuIHByb2Nlc3NSZXN1bHRcbiAgZWxzZSBwaXBlID0gcGlwZUFycmF5WzBdXG5cbiAgbGV0IHBpcGVSZXN1bHQgPSBwcm9jZXNzUmVzdWx0IC8vIHNldCBpbml0aWFsIHJlc3VsdFxuXG4gIGxldCBmdW5jdGlvbkNhbGxiYWNrID0gYXdhaXQgZ3JhcGgudHJhdmVyc2VySW5zdHJ1Y3Rpb24ucmVzb3VyY2VSZXNvbHV0aW9uLnJlc29sdmVSZXNvdXJjZSh7IHRhcmdldE5vZGU6IHBpcGUuZGVzdGluYXRpb24sIGdyYXBoLCBjb250ZXh0UHJvcGVydHlOYW1lOiAnZnVuY3Rpb25SZWZlcmVuY2VDb250ZXh0JyB9KVxuICBpZiAoZnVuY3Rpb25DYWxsYmFjaykge1xuICAgIGxldCBwaXBlRnVuY3Rpb24gPSBhd2FpdCBmdW5jdGlvbkNhbGxiYWNrKHsgbm9kZTogcGlwZS5kZXN0aW5hdGlvbiwgZ3JhcGggfSkgLy8gZXhwZWN0ZWQgdG8gcmV0dXJuIGEgcGlwZSBmdW5jdGlvbi5cbiAgICBwaXBlUmVzdWx0ID0gcGlwZUZ1bmN0aW9uKHByb2Nlc3NSZXN1bHQpXG4gIH1cblxuICAvLyByZWN1cnNpdmUgY2FsbCBmb3IgbmVzdGVkIHBpcGUgZWRnZXMgKGZvcm1pbmcgYSBwaXBlbGluZSBmcm9tIHRoZSBtYWluIHByb2Nlc3Mgbm9kZSkuXG4gIHBpcGVSZXN1bHQgPSBwaXBlUHJvY2Vzc2luZyh7IHRhcmdldE5vZGU6IHBpcGUuZGVzdGluYXRpb24sIHByb2Nlc3NSZXN1bHQ6IHBpcGVSZXN1bHQsIGdyYXBoIH0pXG5cbiAgcmV0dXJuIHBpcGVSZXN1bHRcbn1cbiJdfQ==