import request from '../utils/request';

/**
 * 登录
 * @param account
 * @param password
 * @returns {Promise<AxiosPromise<any>>}
 */
export async function login({ account, password }) {
  return request.post('/users/access-token', {
    account,
    password,
  });
}

/**
 * 设置密码
 * @param password_reset_token
 * @param confirm_password
 * @param password
 * @returns {AxiosPromise<any>}
 */
export function setPassword({
  password_reset_token,
  confirm_password,
  password,
}) {
  return request.post('/users/reset-password', {
    password_reset_token,
    confirm_password,
    password,
  });
}

export function getCurrent() {
}

/**
 * 项目列表
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function projectIndex(params = {}) {
  const paramsTransform = p => ({
    ...params,
    page: p.currentPage,
    'per-page': p.pageSize,
  });
  return request.get('/projects?expand=white_papers,post_user,invest_token', {
    params: paramsTransform(params),
  });
}

/**
 * 项目详情
 * @param id
 * @returns {AxiosPromise<any>}
 */
export function projectDetail({ id }) {
  return request.get(
    `/projects/${id}?expand=post_user,tags,white_papers,members`
  );
}

/**
 * 站点配置
 * @returns {AxiosPromise<any>}
 */
export function getConstants() {
  // request.get('/constants').then(console.log)
  return request.get('/constants');
}

/**
 * 创建项目
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function createProject(params) {
  return request.post('/projects', params);
}

/**
 * 编辑项目
 * @param id
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function editProject(id, params) {
  return request.put(`/projects/${id}`, params);
}

/**
 * 获得上传文件的 token
 * @param type
 * @returns {AxiosPromise<any>}
 */
export function getUploadToken(type) {
  return request.get(`/users/uptoken?dir=${type}`);
}

/**
 * 当前用户
 * @returns {AxiosPromise<any>}
 */
export function getUser() {
  return request.get('/user');
}

/**
 * 根据用户 ID 获取用户详情
 * @returns {AxiosPromise<any>}
 */
export function getUserById(id) {
  return request.get(`/users/${id}`);
}

/**
 * 更新指定用户资料
 * @returns {AxiosPromise<any>}
 */
export function updateUserById(data) {
  return request.put(`/users/${data.id}`, data);
}

/**
 * 标签库
 */
export function getProjectTags() {
  return request.get('/project-tags');
}

/**
 * 删除标签
 * @param id
 * @returns {AxiosPromise}
 */
export function deleteProjectTags(id) {
  return request.delete(`/project-tags/${id}`);
}

/**
 * 添加标签
 * @param id
 * @returns {AxiosPromise}
 */
export function addProjectTags(payload) {
  return request.post('/project-tags', payload);
}

/**
 * 项目 Token 融资信息
 * @param projectId
 * @returns {AxiosPromise<any>}
 */
export function getProjectFinanceToken(projectId) {
  return request.get(
    `/projects/${projectId}/finance-tokens?expand=items,tokens`
  );
}

/**
 * 项目股权融资信息
 * @param projectId
 * @returns {AxiosPromise<any>}
 */
export function getProjectFinanceEquities(projectId) {
  return request.get(
    `/projects/${projectId}/finance-equities?expand=tokens,items`
  );
}

/**
 * 项目 Token 投资记录
 */
export function getProjectInvestTokens(projectId) {
  return request.get(`/projects/${projectId}/invest-tokens?expand=tokens`);
}

/**
 * 项目股权投资记录
 */
export function getProjectInvestEquities(projectId) {
  return request.get(`/projects/${projectId}/invest-equities?expand=tokens`);
}

/**
 * 项目回币记录
 * @param projectId
 * @returns {AxiosPromise<any>}
 */
export function getProjectReturnTokens(projectId) {
  return request.get(`/projects/${projectId}/return-tokens`);
}

/**
 * 创建项目成员
 * @param projectId
 * @param member
 * @returns {AxiosPromise<any>}
 */
export function createProjectMembers({ projectId, member }) {
  return request.post(`/projects/${projectId}/members`, member);
}

/**
 * 更新项目成员
 * @param projectId
 * @param member
 * @returns {AxiosPromise<any>}
 */
export function updateProjectMembers({ memberId, member }) {
  return request.put(`/project-members/${memberId}`, member);
}

/**
 * 创建募资详情
 * @param projectId
 * @param financeInfo
 * @returns {AxiosPromise<any>}
 */
export function createProjectFinanceInfo({ projectId, financeInfo, type }) {
  return request.post(
    `/projects/${projectId}/finance-${type}?expand=tokens,items`,
    financeInfo
  );
}

/**
 * 更新募资详情
 * @param projectId
 * @param financeInfo
 * @returns {AxiosPromise<any>}
 */
export function updateProjectFinanceInfo({ id, financeInfo, type }) {
  return request.put(`/finance-${type}/${id}?expand=tokens,items`, financeInfo);
}

/**
 * 删除募资详情
 * @param projectId
 * @param financeInfo
 * @returns {AxiosPromise<any>}
 */
export function deleteProjectFinanceInfo({ id, type }) {
  return request.delete(`/finance-${type}/${id}`);
}

/**
 * 创建投资记录
 * @param projectId
 * @param financeInfo
 * @returns {AxiosPromise<any>}
 */
export function createProjectInvestInfo({ projectId, financeInfo, type }) {
  return request.post(`/projects/${projectId}/invest-${type}`, financeInfo);
}

/**
 * 更新投资记录
 * @param projectId
 * @param financeInfo
 * @returns {AxiosPromise<any>}
 */
export function updateProjectInvestInfo({ id, financeInfo, type }) {
  return request.put(`/invest-${type}/${id}`, financeInfo);
}

/**
 * 删除投资记录
 * @param projectId
 * @param financeInfo
 * @returns {AxiosPromise<any>}
 */
export function deleteProjectInvestInfo({ id, type }) {
  return request.delete(`/invest-${type}/${id}`);
}

/**
 * 创建回币信息
 * @param projectId
 * @param returnToken
 * @returns {AxiosPromise<any>}
 */
export function createProjectReturnToken({ projectId, returnToken }) {
  return request.post(`/projects/${projectId}/return-tokens`, returnToken);
}

/**
 * 更新回币信息
 * @param projectId
 * @param returnToken
 * @returns {AxiosPromise<any>}
 */
export function updateProjectReturnToken({ id, returnToken }) {
  return request.put(`/return-tokens/${id}`, returnToken);
}

/**
 * 删除回币信息
 * @param projectId
 * @param returnToken
 * @returns {AxiosPromise<any>}
 */
export function deleteProjectReturnToken({ id }) {
  return request.delete(`/return-tokens/${id}`);
}

/**
 * 投资库列表
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function portfolioIndex(params = {}) {
  const paramsTransform = p => ({
    ...params,
    page: p.currentPage,
    'per-page': p.pageSize,
    status: params.status || '4,5,6',
  });
  return request.get('/projects?expand=white_papers,post_user,invest_token', {
    params: paramsTransform(params),
  });
}

/**
 * 资源库列表
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function resourceIndex(params = {}) {
  const paramsTransform = p => ({
    ...params,
    page: p.currentPage,
    'per-page': p.pageSize,
  });
  return request.get('/resources', {
    params: paramsTransform(params),
  });
}

/**
 * 资源库详情
 * @param id
 * @returns {AxiosPromise<any>}
 */
export function resourceDetail({ id }) {
  return request.get(`/resources/${id}`);
}

/**
 * 创建资源库项目
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function createResource(params) {
  return request.post('/resources', params);
}

/**
 * 编辑资源库项目
 * @param id
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function editResource(id, params) {
  return request.put(`/resources/${id}`, params);
}

/**
 * 删除资源库项目
 * @param id
 * @returns {AxiosPromise}
 */
export function deleteResource(id) {
  return request.delete(`/resources/${id}`);
}

/**
 * 用户列表
 * @returns {AxiosPromise<any>}
 */
export function getUsers(req) {
  const paramsTransform = p => ({
    ...req,
    page: p.currentPage,
    'per-page': p.pageSize,
  });
  return request.get('/users', {
    params: paramsTransform(req),
  });
}

/**
 * 创建用户
 * @param payload
 * @returns {AxiosPromise<any>}
 */
export function createUser(payload) {
  return request.post('/users', payload);
}

/**
 * 更新用户资料
 * @param payload
 * @returns {AxiosPromise<any>}
 */
export function updateUserProfile(payload) {
  return request.put('/user', payload);
}

/**
 * 修改用户密码
 * @param payload
 * @returns {AxiosPromise<any>}
 */
export function updateUserPassword(payload) {
  return request.post('/user/update-password', payload);
}

/**
 * 删除用户
 * @param id
 * @returns {AxiosPromise}
 */
export function deleteUserById(id) {
  return request.delete(`/users/${id}`);
}

/**
 * 获取全部角色
 * @returns {AxiosPromise<any>}
 */
export function getAllRoles() {
  return request.get('/rbac/roles');
}

/**
 * 创建角色
 * @param payload
 * @returns {AxiosPromise<any>}
 */
export function createRole(payload) {
  return request.post('/rbac/roles', payload);
}

/**
 * 更新角色
 * @param payload
 * @returns {AxiosPromise<any>}
 */
export function updateRole(payload) {
  return request.put(`/rbac/roles/${payload.id}`, payload);
}

/**
 * 获取全部权限
 * @returns {AxiosPromise<any>}
 */
export function getAllPermissions() {
  return request.get('/rbac/permissions');
}

/**
 * 基金列表
 * @returns {AxiosPromise<any>}
 */
export function getFunds() {
  return request.get('/funds');
}

/**
 * 项目方提交项目
 * @param project
 * @returns {AxiosPromise<any>}
 */
export function createExternalProject(project) {
  return request.post('/external-projects', project);
}

/**
 * 项目方提交项目
 * @param project
 * @returns {AxiosPromise<any>}
 */
export function createExternalProjectMembers({ projectId, member }) {
  return request.post(`external-projects/${projectId}/members`, member);
}

/**
 * 项目方提交募资信息
 * @param id
 * @param financing
 * @returns {AxiosPromise<any>}
 */
export function createExternalFinancing({ id, financing, type }) {
  return request.post(`external-projects/${id}/finance-${type}`, financing);
}

/**
 * 获取退出记录
 * @param projectId
 * @returns {AxiosPromise<any>}
 */
export function getExitToken(projectId) {
  return request.get(`/projects/${projectId}/exit-tokens`);
}

/**
 * 创建退出记录
 * @param payload
 * @returns {AxiosPromise<any>}
 */
export function createProjectExitToken(payload) {
  return request.post(`/projects/${payload.projectId}/exit-tokens`, payload);
}

/**
 * 更新退出记录
 * @param payload
 * @returns {AxiosPromise<any>}
 */
export function updateProjectExitToken(payload) {
  return request.put(`/exit-tokens/${payload.id}`, payload);
}

/**
 * 删除退出记录
 * @param payload
 * @returns {AxiosPromise<any>}
 */
export function deleteProjectExitToken(payload) {
  return request.delete(`/exit-tokens/${payload.id}`);
}

export function getDashboardData(id) {
  return request.get(`/statistic?fid=${id}`);
}

export function getProjectChartData(project_id) {
  return request.get(`/projects/${project_id}/statistic`);
}