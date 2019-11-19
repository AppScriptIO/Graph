"use strict";var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports, "__esModule", { value: true });exports.isSelfEdge = isSelfEdge;exports.getResource = getResource;exports.getValue = getValue;exports.getExecution = getExecution;exports.getFork = getFork;exports.getNext = getNext;exports.getConfigure = getConfigure;exports.getCase = getCase;exports.getDefault = getDefault;exports.getReference = getReference;exports.getExtend = getExtend;exports.getInsert = getInsert;exports.getRerouteTraverseReferenceElement = getRerouteTraverseReferenceElement;exports.getRerouteReturnReferenceElement = getRerouteReturnReferenceElement;exports.getSwitchElement = getSwitchElement;exports.getTargetValue = getTargetValue;

var _assert = _interopRequireDefault(require("assert"));
var schemeReference = _interopRequireWildcard(require("../dataModel/graphSchemeReference.js"));

function isSelfEdge(edge) {
  return edge.source.identity == edge.destination.identity;
}

async function getResource({ concreteDatabase, nodeID }) {
  let resourceArray = await concreteDatabase.getNodeConnection({ direction: 'incoming', nodeID, connectionType: schemeReference.connectionType.resource });
  (0, _assert.default)(
  resourceArray.every(n => schemeReference.connectionProperty.context.includes(n.connection.properties.context)),
  `• Unsupported property value for a RESOURCE connection.`);

  return { resourceArray };
}

async function getValue({ concreteDatabase, nodeID }) {
  let valueArray = await concreteDatabase.getNodeConnection({ direction: 'incoming', nodeID, connectionType: schemeReference.connectionType.value });
  (0, _assert.default)(
  valueArray.every(n => schemeReference.connectionProperty.type.includes(n.connection.properties.type)),
  `• Unsupported "type" property value for a VALUE connection.`);

  return { valueArray: valueArray };
}

async function getExecution({ concreteDatabase, nodeID }) {
  let executeArray = await concreteDatabase.getNodeConnection({ direction: 'outgoing', nodeID, connectionType: schemeReference.connectionType.execute });
  (0, _assert.default)(
  executeArray.every(n => n.destination.labels.includes(schemeReference.nodeLabel.process)),
  `• Unsupported node type for a EXECUTE connection.`);

  return { executeArray };
}

async function getFork({ concreteDatabase, nodeID }) {
  let forkArray = await concreteDatabase.getNodeConnection({ direction: 'outgoing', nodeID: nodeID, connectionType: schemeReference.connectionType.fork });
  (0, _assert.default)(
  forkArray.every(n => n.destination.labels.includes(schemeReference.nodeLabel.port)),
  `• Unsupported property value for a FORK connection.`);

  return { forkArray };
}

async function getNext({ concreteDatabase, nodeID }) {
  let nextArray = await concreteDatabase.getNodeConnection({ direction: 'outgoing', nodeID: nodeID, connectionType: schemeReference.connectionType.next });
  (0, _assert.default)(
  nextArray.every(n => n.destination.labels.includes(schemeReference.nodeLabel.stage) || n.destination.labels.includes(schemeReference.nodeLabel.reroute)),
  `• Unsupported property value for a NEXT connection.`);

  return { nextArray };
}

async function getConfigure({ concreteDatabase, nodeID }) {
  let configureArray = await concreteDatabase.getNodeConnection({ direction: 'incoming', nodeID: nodeID, connectionType: schemeReference.connectionType.configure });
  (0, _assert.default)(
  configureArray.every(n => n.source.labels.includes(schemeReference.nodeLabel.configuration) || n.source.labels.includes(schemeReference.nodeLabel.reroute)),
  `• Unsupported node type for a CONFIGURE connection.`);

  (0, _assert.default)(
  configureArray.every(n => n.connection.properties.setting),
  `• Missing "setting" property on a CONFIGURE connection.`);


  return { configureArray };
}

async function getCase({ concreteDatabase, nodeID }) {
  let caseArray = await concreteDatabase.getNodeConnection({ direction: 'outgoing', nodeID, connectionType: schemeReference.connectionType.case });
  (0, _assert.default)(
  caseArray.every(n => n.destination.labels.includes(schemeReference.nodeLabel.configuration)),
  `• Unsupported property value for a CASE connection.`);

  return { caseArray };
}

async function getDefault({ concreteDatabase, nodeID }) {
  let defaultArray = await concreteDatabase.getNodeConnection({ direction: 'outgoing', nodeID, connectionType: schemeReference.connectionType.default });
  (0, _assert.default)(
  defaultArray.every(n => n.destination.labels.includes(schemeReference.nodeLabel.configuration)),
  `• Unsupported property value for a DEFAULT connection.`);

  return { defaultArray };
}

async function getReference({ concreteDatabase, nodeID }) {
  let referenceArray = await concreteDatabase.getNodeConnection({ direction: 'outgoing', nodeID: nodeID, connectionType: schemeReference.connectionType.reference });
  (0, _assert.default)(
  referenceArray.every(n => n.destination.labels.includes(schemeReference.nodeLabel.stage) || n.destination.labels.includes(schemeReference.nodeLabel.reroute)),
  `• Unsupported node type for a ${schemeReference.connectionType.reference} connection.`);

  return { referenceArray };
}

async function getExtend({ concreteDatabase, nodeID }) {
  let extendArray = await concreteDatabase.getNodeConnection({ direction: 'outgoing', nodeID: nodeID, connectionType: schemeReference.connectionType.extend });
  (0, _assert.default)(
  extendArray.every(n => n.destination.labels.includes(schemeReference.nodeLabel.reroute)),
  `• Unsupported node type for a EXTEND connection.`);

  return { extendArray };
}

async function getInsert({ concreteDatabase, nodeID }) {
  let insertArray = await concreteDatabase.getNodeConnection({ direction: 'incoming', nodeID: nodeID, connectionType: schemeReference.connectionType.insert });
  (0, _assert.default)(
  insertArray.every(n => n.source.labels.includes(schemeReference.nodeLabel.stage)),
  `• Unsupported node type for a INSERT connection.`);

  return { insertArray };
}










async function getRerouteTraverseReferenceElement({ concreteDatabase, nodeID }) {
  const { referenceArray } = await getReference({ concreteDatabase, nodeID });
  const { extendArray } = await getExtend({ concreteDatabase, nodeID });
  const { insertArray } = await getInsert({ concreteDatabase, nodeID });

  if (extendArray.length > 1) throw new Error(`• Multiple extend relationships are not supported for Reroute node.`);
  if (referenceArray.length > 1) throw new Error(`• Multiple reference relationships are not supported for Reroute node.`);

  return { extend: extendArray.length > 0 ? extendArray[0] : null, reference: referenceArray.length > 0 ? referenceArray[0] : null, insertArray };
}

async function getRerouteReturnReferenceElement({ concreteDatabase, nodeID }) {
  const { referenceArray } = await getReference({ concreteDatabase, nodeID });

  if (referenceArray.length > 1) throw new Error(`• Multiple reference relationships are not supported for Reroute node.`);

  return { reference: referenceArray.length > 0 ? referenceArray[0] : null };
}

async function getSwitchElement({ concreteDatabase, nodeID }) {
  const { caseArray } = await getCase({ concreteDatabase, nodeID });
  const { defaultArray } = await getDefault({ concreteDatabase, nodeID });

  if (defaultArray.length > 1) throw new Error(`• Multiple default relationships are not supported for Switch node.`);

  return { caseArray: caseArray.length > 0 ? caseArray : null, default: defaultArray.length > 0 ? defaultArray[0] : null };
}


async function getTargetValue({ concreteDatabase, nodeID }) {

  let value;
  const { valueArray } = await getValue({ concreteDatabase, nodeID });
  if (valueArray.length > 1) throw new Error(`• Multiple VALUE relationships are not supported for Process node.`);else
  if (valueArray.length != 0 && valueArray[0])
  switch (valueArray[0].connection.properties.type) {
    case 'properties':
      value = valueArray[0].destination.properties;
      break;
    case 'node':
      value = valueArray[0].destination;
      break;
    case 'valueProperty':
      value = valueArray[0].destination.properties.value;
      break;
    default:
      throw new Error(`• VALUE edge "type" property value is not supported.`);
      break;}

  return value;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9kYXRhTW9kZWwvY29uY3JldGVEYXRhYmFzZVdyYXBwZXIuanMiXSwibmFtZXMiOlsiaXNTZWxmRWRnZSIsImVkZ2UiLCJzb3VyY2UiLCJpZGVudGl0eSIsImRlc3RpbmF0aW9uIiwiZ2V0UmVzb3VyY2UiLCJjb25jcmV0ZURhdGFiYXNlIiwibm9kZUlEIiwicmVzb3VyY2VBcnJheSIsImdldE5vZGVDb25uZWN0aW9uIiwiZGlyZWN0aW9uIiwiY29ubmVjdGlvblR5cGUiLCJzY2hlbWVSZWZlcmVuY2UiLCJyZXNvdXJjZSIsImV2ZXJ5IiwibiIsImNvbm5lY3Rpb25Qcm9wZXJ0eSIsImNvbnRleHQiLCJpbmNsdWRlcyIsImNvbm5lY3Rpb24iLCJwcm9wZXJ0aWVzIiwiZ2V0VmFsdWUiLCJ2YWx1ZUFycmF5IiwidmFsdWUiLCJ0eXBlIiwiZ2V0RXhlY3V0aW9uIiwiZXhlY3V0ZUFycmF5IiwiZXhlY3V0ZSIsImxhYmVscyIsIm5vZGVMYWJlbCIsInByb2Nlc3MiLCJnZXRGb3JrIiwiZm9ya0FycmF5IiwiZm9yayIsInBvcnQiLCJnZXROZXh0IiwibmV4dEFycmF5IiwibmV4dCIsInN0YWdlIiwicmVyb3V0ZSIsImdldENvbmZpZ3VyZSIsImNvbmZpZ3VyZUFycmF5IiwiY29uZmlndXJlIiwiY29uZmlndXJhdGlvbiIsInNldHRpbmciLCJnZXRDYXNlIiwiY2FzZUFycmF5IiwiY2FzZSIsImdldERlZmF1bHQiLCJkZWZhdWx0QXJyYXkiLCJkZWZhdWx0IiwiZ2V0UmVmZXJlbmNlIiwicmVmZXJlbmNlQXJyYXkiLCJyZWZlcmVuY2UiLCJnZXRFeHRlbmQiLCJleHRlbmRBcnJheSIsImV4dGVuZCIsImdldEluc2VydCIsImluc2VydEFycmF5IiwiaW5zZXJ0IiwiZ2V0UmVyb3V0ZVRyYXZlcnNlUmVmZXJlbmNlRWxlbWVudCIsImxlbmd0aCIsIkVycm9yIiwiZ2V0UmVyb3V0ZVJldHVyblJlZmVyZW5jZUVsZW1lbnQiLCJnZXRTd2l0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SXVDLEtBQUosQ0FBVyxzREFBWCxDQUFOO0FBQ0EsWUFaSjs7QUFjRixTQUFPdkMsS0FBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIFVzZSBjb25jcmV0ZSBEYXRhYmFzZSBjbGFzcyBpbnN0YW5jZXMgdG8gcmV0cmlldmUgbm9kZXMgYW5kIHZlcmlmeSB0aGUgcmVzdWx0cyB3aXRoIGEgc2NoZW1hIC0gd3JhcCB0aGUgY29uY3JldGUgZGF0YWJhc2Ugd2l0aCBtb3JlIHNwZWNpZmljIHF1ZXJ5IGZ1bmN0aW9ucyAqL1xuXG5pbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCdcbmltcG9ydCAqIGFzIHNjaGVtZVJlZmVyZW5jZSBmcm9tICcuLi9kYXRhTW9kZWwvZ3JhcGhTY2hlbWVSZWZlcmVuY2UuanMnXG5cbmV4cG9ydCBmdW5jdGlvbiBpc1NlbGZFZGdlKGVkZ2UpIHtcbiAgcmV0dXJuIGVkZ2Uuc291cmNlLmlkZW50aXR5ID09IGVkZ2UuZGVzdGluYXRpb24uaWRlbnRpdHlcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFJlc291cmNlKHsgY29uY3JldGVEYXRhYmFzZSwgbm9kZUlEIH0pIHtcbiAgbGV0IHJlc291cmNlQXJyYXkgPSBhd2FpdCBjb25jcmV0ZURhdGFiYXNlLmdldE5vZGVDb25uZWN0aW9uKHsgZGlyZWN0aW9uOiAnaW5jb21pbmcnLCBub2RlSUQsIGNvbm5lY3Rpb25UeXBlOiBzY2hlbWVSZWZlcmVuY2UuY29ubmVjdGlvblR5cGUucmVzb3VyY2UgfSlcbiAgYXNzZXJ0KFxuICAgIHJlc291cmNlQXJyYXkuZXZlcnkobiA9PiBzY2hlbWVSZWZlcmVuY2UuY29ubmVjdGlvblByb3BlcnR5LmNvbnRleHQuaW5jbHVkZXMobi5jb25uZWN0aW9uLnByb3BlcnRpZXMuY29udGV4dCkpLFxuICAgIGDigKIgVW5zdXBwb3J0ZWQgcHJvcGVydHkgdmFsdWUgZm9yIGEgUkVTT1VSQ0UgY29ubmVjdGlvbi5gLFxuICApIC8vIHZlcmlmeSBub2RlIHR5cGVcbiAgcmV0dXJuIHsgcmVzb3VyY2VBcnJheSB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRWYWx1ZSh7IGNvbmNyZXRlRGF0YWJhc2UsIG5vZGVJRCB9KSB7XG4gIGxldCB2YWx1ZUFycmF5ID0gYXdhaXQgY29uY3JldGVEYXRhYmFzZS5nZXROb2RlQ29ubmVjdGlvbih7IGRpcmVjdGlvbjogJ2luY29taW5nJywgbm9kZUlELCBjb25uZWN0aW9uVHlwZTogc2NoZW1lUmVmZXJlbmNlLmNvbm5lY3Rpb25UeXBlLnZhbHVlIH0pXG4gIGFzc2VydChcbiAgICB2YWx1ZUFycmF5LmV2ZXJ5KG4gPT4gc2NoZW1lUmVmZXJlbmNlLmNvbm5lY3Rpb25Qcm9wZXJ0eS50eXBlLmluY2x1ZGVzKG4uY29ubmVjdGlvbi5wcm9wZXJ0aWVzLnR5cGUpKSxcbiAgICBg4oCiIFVuc3VwcG9ydGVkIFwidHlwZVwiIHByb3BlcnR5IHZhbHVlIGZvciBhIFZBTFVFIGNvbm5lY3Rpb24uYCxcbiAgKSAvLyB2ZXJpZnkgbm9kZSB0eXBlXG4gIHJldHVybiB7IHZhbHVlQXJyYXk6IHZhbHVlQXJyYXkgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0RXhlY3V0aW9uKHsgY29uY3JldGVEYXRhYmFzZSwgbm9kZUlEIH0pIHtcbiAgbGV0IGV4ZWN1dGVBcnJheSA9IGF3YWl0IGNvbmNyZXRlRGF0YWJhc2UuZ2V0Tm9kZUNvbm5lY3Rpb24oeyBkaXJlY3Rpb246ICdvdXRnb2luZycsIG5vZGVJRCwgY29ubmVjdGlvblR5cGU6IHNjaGVtZVJlZmVyZW5jZS5jb25uZWN0aW9uVHlwZS5leGVjdXRlIH0pXG4gIGFzc2VydChcbiAgICBleGVjdXRlQXJyYXkuZXZlcnkobiA9PiBuLmRlc3RpbmF0aW9uLmxhYmVscy5pbmNsdWRlcyhzY2hlbWVSZWZlcmVuY2Uubm9kZUxhYmVsLnByb2Nlc3MpKSxcbiAgICBg4oCiIFVuc3VwcG9ydGVkIG5vZGUgdHlwZSBmb3IgYSBFWEVDVVRFIGNvbm5lY3Rpb24uYCxcbiAgKSAvLyB2ZXJpZnkgbm9kZSB0eXBlXG4gIHJldHVybiB7IGV4ZWN1dGVBcnJheSB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRGb3JrKHsgY29uY3JldGVEYXRhYmFzZSwgbm9kZUlEIH0pIHtcbiAgbGV0IGZvcmtBcnJheSA9IGF3YWl0IGNvbmNyZXRlRGF0YWJhc2UuZ2V0Tm9kZUNvbm5lY3Rpb24oeyBkaXJlY3Rpb246ICdvdXRnb2luZycsIG5vZGVJRDogbm9kZUlELCBjb25uZWN0aW9uVHlwZTogc2NoZW1lUmVmZXJlbmNlLmNvbm5lY3Rpb25UeXBlLmZvcmsgfSlcbiAgYXNzZXJ0KFxuICAgIGZvcmtBcnJheS5ldmVyeShuID0+IG4uZGVzdGluYXRpb24ubGFiZWxzLmluY2x1ZGVzKHNjaGVtZVJlZmVyZW5jZS5ub2RlTGFiZWwucG9ydCkpLFxuICAgIGDigKIgVW5zdXBwb3J0ZWQgcHJvcGVydHkgdmFsdWUgZm9yIGEgRk9SSyBjb25uZWN0aW9uLmAsXG4gICkgLy8gdmVyaWZ5IG5vZGUgdHlwZVxuICByZXR1cm4geyBmb3JrQXJyYXkgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TmV4dCh7IGNvbmNyZXRlRGF0YWJhc2UsIG5vZGVJRCB9KSB7XG4gIGxldCBuZXh0QXJyYXkgPSBhd2FpdCBjb25jcmV0ZURhdGFiYXNlLmdldE5vZGVDb25uZWN0aW9uKHsgZGlyZWN0aW9uOiAnb3V0Z29pbmcnLCBub2RlSUQ6IG5vZGVJRCwgY29ubmVjdGlvblR5cGU6IHNjaGVtZVJlZmVyZW5jZS5jb25uZWN0aW9uVHlwZS5uZXh0IH0pXG4gIGFzc2VydChcbiAgICBuZXh0QXJyYXkuZXZlcnkobiA9PiBuLmRlc3RpbmF0aW9uLmxhYmVscy5pbmNsdWRlcyhzY2hlbWVSZWZlcmVuY2Uubm9kZUxhYmVsLnN0YWdlKSB8fCBuLmRlc3RpbmF0aW9uLmxhYmVscy5pbmNsdWRlcyhzY2hlbWVSZWZlcmVuY2Uubm9kZUxhYmVsLnJlcm91dGUpKSxcbiAgICBg4oCiIFVuc3VwcG9ydGVkIHByb3BlcnR5IHZhbHVlIGZvciBhIE5FWFQgY29ubmVjdGlvbi5gLFxuICApIC8vIHZlcmlmeSBub2RlIHR5cGVcbiAgcmV0dXJuIHsgbmV4dEFycmF5IH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldENvbmZpZ3VyZSh7IGNvbmNyZXRlRGF0YWJhc2UsIG5vZGVJRCB9KSB7XG4gIGxldCBjb25maWd1cmVBcnJheSA9IGF3YWl0IGNvbmNyZXRlRGF0YWJhc2UuZ2V0Tm9kZUNvbm5lY3Rpb24oeyBkaXJlY3Rpb246ICdpbmNvbWluZycsIG5vZGVJRDogbm9kZUlELCBjb25uZWN0aW9uVHlwZTogc2NoZW1lUmVmZXJlbmNlLmNvbm5lY3Rpb25UeXBlLmNvbmZpZ3VyZSB9KVxuICBhc3NlcnQoXG4gICAgY29uZmlndXJlQXJyYXkuZXZlcnkobiA9PiBuLnNvdXJjZS5sYWJlbHMuaW5jbHVkZXMoc2NoZW1lUmVmZXJlbmNlLm5vZGVMYWJlbC5jb25maWd1cmF0aW9uKSB8fCBuLnNvdXJjZS5sYWJlbHMuaW5jbHVkZXMoc2NoZW1lUmVmZXJlbmNlLm5vZGVMYWJlbC5yZXJvdXRlKSksXG4gICAgYOKAoiBVbnN1cHBvcnRlZCBub2RlIHR5cGUgZm9yIGEgQ09ORklHVVJFIGNvbm5lY3Rpb24uYCxcbiAgKSAvLyB2ZXJpZnkgbm9kZSB0eXBlXG4gIGFzc2VydChcbiAgICBjb25maWd1cmVBcnJheS5ldmVyeShuID0+IG4uY29ubmVjdGlvbi5wcm9wZXJ0aWVzLnNldHRpbmcpLFxuICAgIGDigKIgTWlzc2luZyBcInNldHRpbmdcIiBwcm9wZXJ0eSBvbiBhIENPTkZJR1VSRSBjb25uZWN0aW9uLmAsXG4gIClcblxuICByZXR1cm4geyBjb25maWd1cmVBcnJheSB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDYXNlKHsgY29uY3JldGVEYXRhYmFzZSwgbm9kZUlEIH0pIHtcbiAgbGV0IGNhc2VBcnJheSA9IGF3YWl0IGNvbmNyZXRlRGF0YWJhc2UuZ2V0Tm9kZUNvbm5lY3Rpb24oeyBkaXJlY3Rpb246ICdvdXRnb2luZycsIG5vZGVJRCwgY29ubmVjdGlvblR5cGU6IHNjaGVtZVJlZmVyZW5jZS5jb25uZWN0aW9uVHlwZS5jYXNlIH0pXG4gIGFzc2VydChcbiAgICBjYXNlQXJyYXkuZXZlcnkobiA9PiBuLmRlc3RpbmF0aW9uLmxhYmVscy5pbmNsdWRlcyhzY2hlbWVSZWZlcmVuY2Uubm9kZUxhYmVsLmNvbmZpZ3VyYXRpb24pKSxcbiAgICBg4oCiIFVuc3VwcG9ydGVkIHByb3BlcnR5IHZhbHVlIGZvciBhIENBU0UgY29ubmVjdGlvbi5gLFxuICApIC8vIHZlcmlmeSBub2RlIHR5cGVcbiAgcmV0dXJuIHsgY2FzZUFycmF5IH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldERlZmF1bHQoeyBjb25jcmV0ZURhdGFiYXNlLCBub2RlSUQgfSkge1xuICBsZXQgZGVmYXVsdEFycmF5ID0gYXdhaXQgY29uY3JldGVEYXRhYmFzZS5nZXROb2RlQ29ubmVjdGlvbih7IGRpcmVjdGlvbjogJ291dGdvaW5nJywgbm9kZUlELCBjb25uZWN0aW9uVHlwZTogc2NoZW1lUmVmZXJlbmNlLmNvbm5lY3Rpb25UeXBlLmRlZmF1bHQgfSlcbiAgYXNzZXJ0KFxuICAgIGRlZmF1bHRBcnJheS5ldmVyeShuID0+IG4uZGVzdGluYXRpb24ubGFiZWxzLmluY2x1ZGVzKHNjaGVtZVJlZmVyZW5jZS5ub2RlTGFiZWwuY29uZmlndXJhdGlvbikpLFxuICAgIGDigKIgVW5zdXBwb3J0ZWQgcHJvcGVydHkgdmFsdWUgZm9yIGEgREVGQVVMVCBjb25uZWN0aW9uLmAsXG4gICkgLy8gdmVyaWZ5IG5vZGUgdHlwZVxuICByZXR1cm4geyBkZWZhdWx0QXJyYXkgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UmVmZXJlbmNlKHsgY29uY3JldGVEYXRhYmFzZSwgbm9kZUlEIH0pIHtcbiAgbGV0IHJlZmVyZW5jZUFycmF5ID0gYXdhaXQgY29uY3JldGVEYXRhYmFzZS5nZXROb2RlQ29ubmVjdGlvbih7IGRpcmVjdGlvbjogJ291dGdvaW5nJywgbm9kZUlEOiBub2RlSUQsIGNvbm5lY3Rpb25UeXBlOiBzY2hlbWVSZWZlcmVuY2UuY29ubmVjdGlvblR5cGUucmVmZXJlbmNlIH0pXG4gIGFzc2VydChcbiAgICByZWZlcmVuY2VBcnJheS5ldmVyeShuID0+IG4uZGVzdGluYXRpb24ubGFiZWxzLmluY2x1ZGVzKHNjaGVtZVJlZmVyZW5jZS5ub2RlTGFiZWwuc3RhZ2UpIHx8IG4uZGVzdGluYXRpb24ubGFiZWxzLmluY2x1ZGVzKHNjaGVtZVJlZmVyZW5jZS5ub2RlTGFiZWwucmVyb3V0ZSkpLFxuICAgIGDigKIgVW5zdXBwb3J0ZWQgbm9kZSB0eXBlIGZvciBhICR7c2NoZW1lUmVmZXJlbmNlLmNvbm5lY3Rpb25UeXBlLnJlZmVyZW5jZX0gY29ubmVjdGlvbi5gLFxuICApIC8vIHZlcmlmeSBub2RlIHR5cGVcbiAgcmV0dXJuIHsgcmVmZXJlbmNlQXJyYXkgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0RXh0ZW5kKHsgY29uY3JldGVEYXRhYmFzZSwgbm9kZUlEIH0pIHtcbiAgbGV0IGV4dGVuZEFycmF5ID0gYXdhaXQgY29uY3JldGVEYXRhYmFzZS5nZXROb2RlQ29ubmVjdGlvbih7IGRpcmVjdGlvbjogJ291dGdvaW5nJywgbm9kZUlEOiBub2RlSUQsIGNvbm5lY3Rpb25UeXBlOiBzY2hlbWVSZWZlcmVuY2UuY29ubmVjdGlvblR5cGUuZXh0ZW5kIH0pXG4gIGFzc2VydChcbiAgICBleHRlbmRBcnJheS5ldmVyeShuID0+IG4uZGVzdGluYXRpb24ubGFiZWxzLmluY2x1ZGVzKHNjaGVtZVJlZmVyZW5jZS5ub2RlTGFiZWwucmVyb3V0ZSkpLFxuICAgIGDigKIgVW5zdXBwb3J0ZWQgbm9kZSB0eXBlIGZvciBhIEVYVEVORCBjb25uZWN0aW9uLmAsXG4gICkgLy8gdmVyaWZ5IG5vZGUgdHlwZVxuICByZXR1cm4geyBleHRlbmRBcnJheSB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRJbnNlcnQoeyBjb25jcmV0ZURhdGFiYXNlLCBub2RlSUQgfSkge1xuICBsZXQgaW5zZXJ0QXJyYXkgPSBhd2FpdCBjb25jcmV0ZURhdGFiYXNlLmdldE5vZGVDb25uZWN0aW9uKHsgZGlyZWN0aW9uOiAnaW5jb21pbmcnLCBub2RlSUQ6IG5vZGVJRCwgY29ubmVjdGlvblR5cGU6IHNjaGVtZVJlZmVyZW5jZS5jb25uZWN0aW9uVHlwZS5pbnNlcnQgfSlcbiAgYXNzZXJ0KFxuICAgIGluc2VydEFycmF5LmV2ZXJ5KG4gPT4gbi5zb3VyY2UubGFiZWxzLmluY2x1ZGVzKHNjaGVtZVJlZmVyZW5jZS5ub2RlTGFiZWwuc3RhZ2UpKSxcbiAgICBg4oCiIFVuc3VwcG9ydGVkIG5vZGUgdHlwZSBmb3IgYSBJTlNFUlQgY29ubmVjdGlvbi5gLFxuICApIC8vIHZlcmlmeSBub2RlIHR5cGVcbiAgcmV0dXJuIHsgaW5zZXJ0QXJyYXkgfVxufVxuXG4vKlxuICAgICAgXyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8gICAgICAgICAgIF8gICAgICAgICAgICAgICAgICAgICAgICAgXyAgICAgICAgICAgXG4gICAgIC8gXFwgICBfXyBfICBfXyBfIF8gX18gX19fICBfXyBfICBfXyBffCB8XyBfX18gIF9ffCB8ICAgX18gXyBfICAgXyAgX19fIF8gX18oXykgX19fICBfX18gXG4gICAgLyBfIFxcIC8gX2AgfC8gX2AgfCAnX18vIF8gXFwvIF9gIHwvIF9gIHwgX18vIF8gXFwvIF9gIHwgIC8gX2AgfCB8IHwgfC8gXyBcXCAnX198IHwvIF8gXFwvIF9ffFxuICAgLyBfX18gXFwgKF98IHwgKF98IHwgfCB8ICBfXy8gKF98IHwgKF98IHwgfHwgIF9fLyAoX3wgfCB8IChffCB8IHxffCB8ICBfXy8gfCAgfCB8ICBfXy9cXF9fIFxcXG4gIC9fLyAgIFxcX1xcX18sIHxcXF9fLCB8X3wgIFxcX19ffFxcX18sIHxcXF9fLF98XFxfX1xcX19ffFxcX18sX3wgIFxcX18sIHxcXF9fLF98XFxfX198X3wgIHxffFxcX19ffHxfX18vXG4gICAgICAgICAgfF9fXy8gfF9fXy8gICAgICAgICAgfF9fXy8gICAgICAgICAgICAgICAgICAgICAgICAgIHxffCAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiovXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRSZXJvdXRlVHJhdmVyc2VSZWZlcmVuY2VFbGVtZW50KHsgY29uY3JldGVEYXRhYmFzZSwgbm9kZUlEIH0pIHtcbiAgY29uc3QgeyByZWZlcmVuY2VBcnJheSB9ID0gYXdhaXQgZ2V0UmVmZXJlbmNlKHsgY29uY3JldGVEYXRhYmFzZSwgbm9kZUlEIH0pXG4gIGNvbnN0IHsgZXh0ZW5kQXJyYXkgfSA9IGF3YWl0IGdldEV4dGVuZCh7IGNvbmNyZXRlRGF0YWJhc2UsIG5vZGVJRCB9KVxuICBjb25zdCB7IGluc2VydEFycmF5IH0gPSBhd2FpdCBnZXRJbnNlcnQoeyBjb25jcmV0ZURhdGFiYXNlLCBub2RlSUQgfSlcblxuICBpZiAoZXh0ZW5kQXJyYXkubGVuZ3RoID4gMSkgdGhyb3cgbmV3IEVycm9yKGDigKIgTXVsdGlwbGUgZXh0ZW5kIHJlbGF0aW9uc2hpcHMgYXJlIG5vdCBzdXBwb3J0ZWQgZm9yIFJlcm91dGUgbm9kZS5gKVxuICBpZiAocmVmZXJlbmNlQXJyYXkubGVuZ3RoID4gMSkgdGhyb3cgbmV3IEVycm9yKGDigKIgTXVsdGlwbGUgcmVmZXJlbmNlIHJlbGF0aW9uc2hpcHMgYXJlIG5vdCBzdXBwb3J0ZWQgZm9yIFJlcm91dGUgbm9kZS5gKVxuXG4gIHJldHVybiB7IGV4dGVuZDogZXh0ZW5kQXJyYXkubGVuZ3RoID4gMCA/IGV4dGVuZEFycmF5WzBdIDogbnVsbCwgcmVmZXJlbmNlOiByZWZlcmVuY2VBcnJheS5sZW5ndGggPiAwID8gcmVmZXJlbmNlQXJyYXlbMF0gOiBudWxsLCBpbnNlcnRBcnJheSB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRSZXJvdXRlUmV0dXJuUmVmZXJlbmNlRWxlbWVudCh7IGNvbmNyZXRlRGF0YWJhc2UsIG5vZGVJRCB9KSB7XG4gIGNvbnN0IHsgcmVmZXJlbmNlQXJyYXkgfSA9IGF3YWl0IGdldFJlZmVyZW5jZSh7IGNvbmNyZXRlRGF0YWJhc2UsIG5vZGVJRCB9KVxuXG4gIGlmIChyZWZlcmVuY2VBcnJheS5sZW5ndGggPiAxKSB0aHJvdyBuZXcgRXJyb3IoYOKAoiBNdWx0aXBsZSByZWZlcmVuY2UgcmVsYXRpb25zaGlwcyBhcmUgbm90IHN1cHBvcnRlZCBmb3IgUmVyb3V0ZSBub2RlLmApXG5cbiAgcmV0dXJuIHsgcmVmZXJlbmNlOiByZWZlcmVuY2VBcnJheS5sZW5ndGggPiAwID8gcmVmZXJlbmNlQXJyYXlbMF0gOiBudWxsIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFN3aXRjaEVsZW1lbnQoeyBjb25jcmV0ZURhdGFiYXNlLCBub2RlSUQgfSkge1xuICBjb25zdCB7IGNhc2VBcnJheSB9ID0gYXdhaXQgZ2V0Q2FzZSh7IGNvbmNyZXRlRGF0YWJhc2UsIG5vZGVJRCB9KVxuICBjb25zdCB7IGRlZmF1bHRBcnJheSB9ID0gYXdhaXQgZ2V0RGVmYXVsdCh7IGNvbmNyZXRlRGF0YWJhc2UsIG5vZGVJRCB9KVxuXG4gIGlmIChkZWZhdWx0QXJyYXkubGVuZ3RoID4gMSkgdGhyb3cgbmV3IEVycm9yKGDigKIgTXVsdGlwbGUgZGVmYXVsdCByZWxhdGlvbnNoaXBzIGFyZSBub3Qgc3VwcG9ydGVkIGZvciBTd2l0Y2ggbm9kZS5gKVxuXG4gIHJldHVybiB7IGNhc2VBcnJheTogY2FzZUFycmF5Lmxlbmd0aCA+IDAgPyBjYXNlQXJyYXkgOiBudWxsLCBkZWZhdWx0OiBkZWZhdWx0QXJyYXkubGVuZ3RoID4gMCA/IGRlZmF1bHRBcnJheVswXSA6IG51bGwgfVxufVxuXG4vLyBWYWx1ZSBjb25uZWN0aW9uIGNvbmNlcHQgaW1wbGVtZW50YXRpb25cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRUYXJnZXRWYWx1ZSh7IGNvbmNyZXRlRGF0YWJhc2UsIG5vZGVJRCB9KSB7XG4gIC8vIGdldCBWQUxVRSBjb25uZWN0aW9uXG4gIGxldCB2YWx1ZVxuICBjb25zdCB7IHZhbHVlQXJyYXkgfSA9IGF3YWl0IGdldFZhbHVlKHsgY29uY3JldGVEYXRhYmFzZSwgbm9kZUlEIH0pXG4gIGlmICh2YWx1ZUFycmF5Lmxlbmd0aCA+IDEpIHRocm93IG5ldyBFcnJvcihg4oCiIE11bHRpcGxlIFZBTFVFIHJlbGF0aW9uc2hpcHMgYXJlIG5vdCBzdXBwb3J0ZWQgZm9yIFByb2Nlc3Mgbm9kZS5gKVxuICBlbHNlIGlmICh2YWx1ZUFycmF5Lmxlbmd0aCAhPSAwICYmIHZhbHVlQXJyYXlbMF0pXG4gICAgc3dpdGNoICh2YWx1ZUFycmF5WzBdLmNvbm5lY3Rpb24ucHJvcGVydGllcy50eXBlKSB7XG4gICAgICBjYXNlICdwcm9wZXJ0aWVzJzpcbiAgICAgICAgdmFsdWUgPSB2YWx1ZUFycmF5WzBdLmRlc3RpbmF0aW9uLnByb3BlcnRpZXNcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ25vZGUnOlxuICAgICAgICB2YWx1ZSA9IHZhbHVlQXJyYXlbMF0uZGVzdGluYXRpb25cbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ3ZhbHVlUHJvcGVydHknOlxuICAgICAgICB2YWx1ZSA9IHZhbHVlQXJyYXlbMF0uZGVzdGluYXRpb24ucHJvcGVydGllcy52YWx1ZVxuICAgICAgICBicmVha1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGDigKIgVkFMVUUgZWRnZSBcInR5cGVcIiBwcm9wZXJ0eSB2YWx1ZSBpcyBub3Qgc3VwcG9ydGVkLmApXG4gICAgICAgIGJyZWFrXG4gICAgfVxuICByZXR1cm4gdmFsdWVcbn1cbiJdfQ==