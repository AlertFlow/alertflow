/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

declare module 'vue-router/auto-routes' {
  import type {
    RouteRecordInfo,
    ParamValue,
    ParamValueOneOrMore,
    ParamValueZeroOrMore,
    ParamValueZeroOrOne,
  } from 'unplugin-vue-router/types'

  /**
   * Route name map generated by unplugin-vue-router
   */
  export interface RouteNamedMap {
    'root': RouteRecordInfo<'root', '/', Record<never, never>, Record<never, never>>,
    '$error': RouteRecordInfo<'$error', '/:error(.*)', { error: ParamValue<true> }, { error: ParamValue<false> }>,
    'dashboard-flow:id': RouteRecordInfo<'dashboard-flow:id', '/dashboard/flow/::id', { :id: ParamValue<true> }, { :id: ParamValue<false> }>,
    'dashboard-flow:id-execution:id': RouteRecordInfo<'dashboard-flow:id-execution:id', '/dashboard/flow/::id/execution/::id', { :id: ParamValue<true>, :id: ParamValue<true> }, { :id: ParamValue<false>, :id: ParamValue<false> }>,
    'dashboard-flows': RouteRecordInfo<'dashboard-flows', '/dashboard/flows', Record<never, never>, Record<never, never>>,
    'dashboard-payloads': RouteRecordInfo<'dashboard-payloads', '/dashboard/payloads', Record<never, never>, Record<never, never>>,
    'dashboard-projects': RouteRecordInfo<'dashboard-projects', '/dashboard/projects', Record<never, never>, Record<never, never>>,
    'login': RouteRecordInfo<'login', '/login', Record<never, never>, Record<never, never>>,
    'settings': RouteRecordInfo<'settings', '/settings', Record<never, never>, Record<never, never>>,
  }
}
