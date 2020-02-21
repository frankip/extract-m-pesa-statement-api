import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";


export default function PrivateRoute({
    component : Component,
    isTokenExpired,
    ...rest
}) {
    return(
        <Route
        {...rest}
        render = {props =>
            !isTokenExpired === true ?(
                <Component {...props} {...rest} />
            ): (
                <Redirect to="/login" />
            )
        }
        />
    );
}