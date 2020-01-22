"use strict";var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports, "__esModule", { value: true });exports.resolveEvaluationConfiguration = resolveEvaluationConfiguration;var _assert = _interopRequireDefault(require("assert"));
var schemeReference = _interopRequireWildcard(require("../../../../dataModel/graphSchemeReference.js"));
var _handleJSNativeDataStructure = require("@dependency/handleJSNativeDataStructure");





async function resolveEvaluationConfiguration({ targetNode, traverser = this }) {var _context;
  let { configureArray } = await (_context = traverser.graph.database, traverser.graph.database.getConfigure).call(_context, { nodeID: targetNode.identity });


  let configurationMap = new Map();
  for (let configure of configureArray)
  if (configure.source.labels.includes(schemeReference.nodeLabel.reroute)) {var _context2;

    let { result: configurationNode } = await (_context2 = traverser.graph, traverser.graph.traverse).call(_context2,
    {
      nodeInstance: configure.source,
      implementationKey: {
        [schemeReference.nodeLabel.reroute]: 'returnReference' } },


    {
      traverseCallContext: {
        targetNode: configure.destination } });



    if (!configurationNode) continue;
    (0, _assert.default)(configurationNode && configurationNode.labels.includes(schemeReference.nodeLabel.configuration), `• CONFIGURE sub-graph traversal must return a Configuration node.`);

    configurationMap.set(configure, configurationNode);
  }


  let implementationConfigurationArray = configureArray.
  filter(configure => configure.connection.properties.setting == 'implementation').
  map(configure => {
    let configuration;
    if (configurationMap.get(configure)) configuration = configurationMap.get(configure);else
    configuration = configure.source;
    return (0, _handleJSNativeDataStructure.extractPropertyFromObject)(configuration.properties, schemeReference.traversalOption);
  });
  let evaluationConfigurationArray = configureArray.
  filter(configure => configure.connection.properties.setting == 'evaluation').
  map(configure => {
    let configuration;
    if (configurationMap.get(configure)) configuration = configurationMap.get(configure);else
    configuration = configure.source;
    return (0, _handleJSNativeDataStructure.extractPropertyFromObject)(configuration.properties, schemeReference.evaluationOption);
  });


  let implementationConfiguration = implementationConfigurationArray.length > 0 ? Object.assign(...implementationConfigurationArray) : {};
  let evaluationConfiguration = evaluationConfigurationArray.length > 0 ? Object.assign(...evaluationConfigurationArray) : {};

  return { implementationConfiguration, evaluationConfiguration };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NvdXJjZS9jb25zdHJ1Y3RhYmxlL1RyYXZlcnNlci9tZXRob2QvdHJhdmVyc2VySW5zdHJ1Y3Rpb24vY29uZmlndXJhdGlvbkV2YWx1YXRpb24uanMiXSwibmFtZXMiOlsicmVzb2x2ZUV2YWx1YXRpb25Db25maWd1cmF0aW9uIiwidGFyZ2V0Tm9kZSIsInRyYXZlcnNlciIsImNvbmZpZ3VyZUFycmF5IiwiZ3JhcGgiLCJkYXRhYmFzZSIsImdldENvbmZpZ3VyZSIsIm5vZGVJRCIsImlkZW50aXR5IiwiY29uZmlndXJhdGlvbk1hcCIsIk1hcCIsImNvbmZpZ3VyZSIsInNvdXJjZSIsImxhYmVscyIsImluY2x1ZGVzIiwic2NoZW1lUmVmZXJlbmNlIiwibm9kZUxhYmVsIiwicmVyb3V0ZSIsInJlc3VsdCIsImNvbmZpZ3VyYXRpb25Ob2RlIiwidHJhdmVyc2UiLCJub2RlSW5zdGFuY2UiLCJpbXBsZW1lbnRhdGlvbktleSIsInRyYXZlcnNlQ2FsbENvbnRleHQiLCJkZXN0aW5hdGlvbiIsImNvbmZpZ3VyYXRpb24iLCJzZXQiLCJpbXBsZW1lbnRhdGlvbkNvbmZpZ3VyYXRpb25BcnJheSIsImZpbHRlciIsImNvbm5lY3Rpb24iLCJwcm9wZXJ0aWVzIiwic2V0dGluZyIsIm1hcCIsImdldCIsInRyYXZlcnNhbE9wdGlvbiIsImV2YWx1YXRpb25Db25maWd1cmF0aW9uQXJyYXkiLCJldmFsdWF0aW9uT3B0aW9uIiwiaW1wbGVtZW50YXRpb25Db25maWd1cmF0aW9uIiwibGVuZ3RoIiwiT2JqZWN0IiwiYXNzaWduIiwiZXZhbHVhdGlvbkNvbmZpZ3VyYXRpb24iXSwibWFwcGluZ3MiOiIrVEFBQTtBQUNBO0FBQ0E7Ozs7OztBQU1PLGVBQWVBLDhCQUFmLENBQThDLEVBQUVDLFVBQUYsRUFBY0MsU0FBUyxHQUFHLElBQTFCLEVBQTlDLEVBQWdGO0FBQ3JGLE1BQUksRUFBRUMsY0FBRixLQUFxQixNQUFNLFlBQUFELFNBQVMsQ0FB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QSxNQUFJYyx1QkFBdUIsR0FBR04sNEJBQTRCLENBQUNHLE1BQTdCLEdBQXNDLENBQXRDLEdBQTBDQyxNQUFNLENBQUNDLE1BQVAsQ0FBYyxHQUFHTCw0QkFBakIsQ0FBMUMsR0FBMkYsRUFBekg7O0FBRUEsU0FBTyxFQUFFRSwyQkFBRixFQUErQkksdUJBQS9CLEVBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0J1xuaW1wb3J0ICogYXMgc2NoZW1lUmVmZXJlbmNlIGZyb20gJy4uLy4uLy4uLy4uL2RhdGFNb2RlbC9ncmFwaFNjaGVtZVJlZmVyZW5jZS5qcydcbmltcG9ydCB7IGV4dHJhY3RQcm9wZXJ0eUZyb21PYmplY3QgfSBmcm9tICdAZGVwZW5kZW5jeS9oYW5kbGVKU05hdGl2ZURhdGFTdHJ1Y3R1cmUnXG5cbi8qKlxuICogTm9kZSdzIGluY2x1ZGUvZXhjbHVkZSBldmFsdWF0aW9uIC0gZXZhbHVhdGUgd2hldGhlciBvciBub3QgYSBub2RlIHdob3VsZCBiZSBpbmNsdWRlZCBpbiB0aGUgbm9kZSBmZWVkIGFuZCBzdWJzZXF1ZW50bHkgaW4gdGhlIHRyYXZlcnNhbC4gY29udGludWUgY2hpbGQgbm9kZXMgdHJhdmVyc2FsIG9yIGJyZWFrIHRyYXZlcnNhbC5cbiAqICYgdHJhdmVyc2FsIGltcGxlbWVudGF0aW9uIGNvbmZpZ3VyYXRpb24gLSBjaG9vc2VzIHRoZSBjdXN0b20gZnVuY3Rpb25zIHRvIGJlIHVzZWQgaW4gdGhlIHRyYXZlcnNhbC5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlc29sdmVFdmFsdWF0aW9uQ29uZmlndXJhdGlvbih7IHRhcmdldE5vZGUsIHRyYXZlcnNlciA9IHRoaXMgfSkge1xuICBsZXQgeyBjb25maWd1cmVBcnJheSB9ID0gYXdhaXQgdHJhdmVyc2VyLmdyYXBoLmRhdGFiYXNlOjp0cmF2ZXJzZXIuZ3JhcGguZGF0YWJhc2UuZ2V0Q29uZmlndXJlKHsgbm9kZUlEOiB0YXJnZXROb2RlLmlkZW50aXR5IH0pXG5cbiAgLy8gZXZhbHVhdGUgY29uZmlndXJhdGlvbiBieSB0cmF2ZXJzaW5nIHN1YmdyYXBoIG5vZGVzICh0cmF2ZXJzZSBzd2l0Y2ggc3RhZ2Ugbm9kZSkgJiByZXBsYWNlIGRlc3RpbmF0aW9uIG5vZGUgd2l0aCBhIGNvbmZpZ3VyYXRpb24gbm9kZTpcbiAgbGV0IGNvbmZpZ3VyYXRpb25NYXAgPSBuZXcgTWFwKCkgLy8gbWFwcyBldmFsdWF0ZWQgY29uZmlndXJhdGlvbiB0byB0aGUgQ09ORklHVVJFIHJlbGF0aW9uc2hpcHMuXG4gIGZvciAobGV0IGNvbmZpZ3VyZSBvZiBjb25maWd1cmVBcnJheSlcbiAgICBpZiAoY29uZmlndXJlLnNvdXJjZS5sYWJlbHMuaW5jbHVkZXMoc2NoZW1lUmVmZXJlbmNlLm5vZGVMYWJlbC5yZXJvdXRlKSkge1xuICAgICAgLy8gaWYgcmVyb3V0ZSBub2RlLCB0aGVuIHJlcXVlc3QgcmVzb2x1dGlvbiB0byB0aGUgcmVmZXJlbmNlIG5vZGUgKHJ1biBpbiBhIHNlcGFyYXRlIHRyYXZlcnNhbCByZWN1cnNpdmUgc2NvcGVzKVxuICAgICAgbGV0IHsgcmVzdWx0OiBjb25maWd1cmF0aW9uTm9kZSB9ID0gYXdhaXQgdHJhdmVyc2VyLmdyYXBoOjp0cmF2ZXJzZXIuZ3JhcGgudHJhdmVyc2UoXG4gICAgICAgIHtcbiAgICAgICAgICBub2RlSW5zdGFuY2U6IGNvbmZpZ3VyZS5zb3VyY2UsXG4gICAgICAgICAgaW1wbGVtZW50YXRpb25LZXk6IHtcbiAgICAgICAgICAgIFtzY2hlbWVSZWZlcmVuY2Uubm9kZUxhYmVsLnJlcm91dGVdOiAncmV0dXJuUmVmZXJlbmNlJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdHJhdmVyc2VDYWxsQ29udGV4dDoge1xuICAgICAgICAgICAgdGFyZ2V0Tm9kZTogY29uZmlndXJlLmRlc3RpbmF0aW9uLCAvLyBwcm92aWRlIGFjY2VzcyBpbiB0aGUgcmVyb3V0ZSBmb3IgdGhlIHRhcmdldCBub2RlIGNhbGxlciByZXF1ZXN0aW5nIHRoZSByZXNvbHV0aW9uIG9mIHRoZSByZWZlcmVuY2UuXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIClcbiAgICAgIGlmICghY29uZmlndXJhdGlvbk5vZGUpIGNvbnRpbnVlIC8vIGlmIG5vIENvbmZpZ3VyYXRpb24gd2FzIHJlc29sdmVkIHNraXAuXG4gICAgICBhc3NlcnQoY29uZmlndXJhdGlvbk5vZGUgJiYgY29uZmlndXJhdGlvbk5vZGUubGFiZWxzLmluY2x1ZGVzKHNjaGVtZVJlZmVyZW5jZS5ub2RlTGFiZWwuY29uZmlndXJhdGlvbiksIGDigKIgQ09ORklHVVJFIHN1Yi1ncmFwaCB0cmF2ZXJzYWwgbXVzdCByZXR1cm4gYSBDb25maWd1cmF0aW9uIG5vZGUuYClcbiAgICAgIC8vIHJlcGxhY2UgZGVzdGluYXRpb24gbm9kZSB3aXRoIGFwcHJvcHJpYXRlIGV2YWx1YXRlZCBjb25maWd1cmF0aW9uOlxuICAgICAgY29uZmlndXJhdGlvbk1hcC5zZXQoY29uZmlndXJlLCBjb25maWd1cmF0aW9uTm9kZSlcbiAgICB9XG5cbiAgLy8gZXh0cmFjdCBjb25maWd1cmF0aW9uIHBhcmFtZXRlcnMgZnJvbSBjb25maWd1cmUgcmVsYXRpb25zaGlwOlxuICBsZXQgaW1wbGVtZW50YXRpb25Db25maWd1cmF0aW9uQXJyYXkgPSBjb25maWd1cmVBcnJheVxuICAgIC5maWx0ZXIoY29uZmlndXJlID0+IGNvbmZpZ3VyZS5jb25uZWN0aW9uLnByb3BlcnRpZXMuc2V0dGluZyA9PSAnaW1wbGVtZW50YXRpb24nKVxuICAgIC5tYXAoY29uZmlndXJlID0+IHtcbiAgICAgIGxldCBjb25maWd1cmF0aW9uXG4gICAgICBpZiAoY29uZmlndXJhdGlvbk1hcC5nZXQoY29uZmlndXJlKSkgY29uZmlndXJhdGlvbiA9IGNvbmZpZ3VyYXRpb25NYXAuZ2V0KGNvbmZpZ3VyZSlcbiAgICAgIGVsc2UgY29uZmlndXJhdGlvbiA9IGNvbmZpZ3VyZS5zb3VyY2VcbiAgICAgIHJldHVybiBleHRyYWN0UHJvcGVydHlGcm9tT2JqZWN0KGNvbmZpZ3VyYXRpb24ucHJvcGVydGllcywgc2NoZW1lUmVmZXJlbmNlLnRyYXZlcnNhbE9wdGlvbilcbiAgICB9KVxuICBsZXQgZXZhbHVhdGlvbkNvbmZpZ3VyYXRpb25BcnJheSA9IGNvbmZpZ3VyZUFycmF5XG4gICAgLmZpbHRlcihjb25maWd1cmUgPT4gY29uZmlndXJlLmNvbm5lY3Rpb24ucHJvcGVydGllcy5zZXR0aW5nID09ICdldmFsdWF0aW9uJylcbiAgICAubWFwKGNvbmZpZ3VyZSA9PiB7XG4gICAgICBsZXQgY29uZmlndXJhdGlvblxuICAgICAgaWYgKGNvbmZpZ3VyYXRpb25NYXAuZ2V0KGNvbmZpZ3VyZSkpIGNvbmZpZ3VyYXRpb24gPSBjb25maWd1cmF0aW9uTWFwLmdldChjb25maWd1cmUpXG4gICAgICBlbHNlIGNvbmZpZ3VyYXRpb24gPSBjb25maWd1cmUuc291cmNlXG4gICAgICByZXR1cm4gZXh0cmFjdFByb3BlcnR5RnJvbU9iamVjdChjb25maWd1cmF0aW9uLnByb3BlcnRpZXMsIHNjaGVtZVJlZmVyZW5jZS5ldmFsdWF0aW9uT3B0aW9uKVxuICAgIH0pXG5cbiAgLy8gbWVyZ2UgbXVsdGlwbGUgY29uZmlndXJhdGlvbnMgb2YgdGhlIHNhbWUgdHlwZVxuICBsZXQgaW1wbGVtZW50YXRpb25Db25maWd1cmF0aW9uID0gaW1wbGVtZW50YXRpb25Db25maWd1cmF0aW9uQXJyYXkubGVuZ3RoID4gMCA/IE9iamVjdC5hc3NpZ24oLi4uaW1wbGVtZW50YXRpb25Db25maWd1cmF0aW9uQXJyYXkpIDoge31cbiAgbGV0IGV2YWx1YXRpb25Db25maWd1cmF0aW9uID0gZXZhbHVhdGlvbkNvbmZpZ3VyYXRpb25BcnJheS5sZW5ndGggPiAwID8gT2JqZWN0LmFzc2lnbiguLi5ldmFsdWF0aW9uQ29uZmlndXJhdGlvbkFycmF5KSA6IHt9XG5cbiAgcmV0dXJuIHsgaW1wbGVtZW50YXRpb25Db25maWd1cmF0aW9uLCBldmFsdWF0aW9uQ29uZmlndXJhdGlvbiB9XG59XG4iXX0=