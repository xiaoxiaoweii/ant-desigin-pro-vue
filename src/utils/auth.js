// 返回当前用户
export function getCurrentAuthority() {
  return ["admin"];
}
// 校验用户权限
export function check(authority) {
  const current = getCurrentAuthority();
  // 判断用户可以访问的菜单项
  return current.some(item => authority.includes(item));
}

// 判断登陆

export function isLogin() {
  // 获取用户 用户不为guest则视为已经登陆系统
  const current = getCurrentAuthority();
  return current && current[0] !== "guest";
}
