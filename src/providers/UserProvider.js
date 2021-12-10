import { createContext, useCallback } from "react";
import { connect } from "react-redux";

export const UserContext = createContext(null);

const UserProvider = ({ user, children }) => {
  const hasPermission = useCallback(
    (permList = []) => {
      if (user) {
        return permList.includes(user.group);
      }
      return false;
    },
    [user]
  );

  return (
    <UserContext.Provider value={{ hasPermission }}>
      {children}
    </UserContext.Provider>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(UserProvider);
