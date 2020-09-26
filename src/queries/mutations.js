import gql from 'graphql-tag'
export const AUTH_REQUEST_GQL = gql`
    mutation login ($email: String! $password: String! ){
        login(input: {email: $email password: $password}){
            access_token
        }
    }
`
export const REFRESH_AUTH_GQL = gql`
    mutation refreshToken ($token: String!) {
        refreshToken(input: { token: $token }){
            access_token
        }
    }
`
export const DELETE_TENANT_GQL = gql`
    mutation deleteTenant ($name: String, $id: Int){
        deleteTenant(input: {name: $name, id: $id})
    }
`
export const CREATE_TENANT_GQL = gql`
    mutation createTenant (
        $name: String!
        $organization: String!
        $order: String!
        $email: String!
        $displayName: String!
        $quota: Int!
        $type: TenantType!
        )
    { createTenant(input: {
        name: $name,
        organization: $organization,
        order: $order,
        email: $email,
        displayName: $displayName,
        quota: $quota,
        type: $type
    }){
        name,
        id,
        primaryGroup,
        officeGroup,
        organization,
        order,
        users{
            id,
            displayName,
            email
        },
        status
    }
    }
`

export const DELETE_USER_GQL = gql`
    mutation deleteUser ($name: String!){
        deleteUser(input: {name: $name})
    }
`
export const CREATE_USER_GQL = gql`
    mutation createUser (
        $email: String!
        $displayName: String!
        $quota: Int!
        $office: Boolean
    )
    { createUser(input: {
        email: $email,
        displayName: $displayName,
        quota: $quota,
        office: $office
    }){
        id,
        email,
        displayName,
        quota,
        free,
        tenantAdmin,
        office
    }
    }
`