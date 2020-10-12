use cosmwasm_std::{
    log, to_binary, Api, Binary, Empty, Env,
    Extern, HandleResponse, InitResponse, Querier, StdResult,
    Storage
};

use crate::msg::{
    InitMsg, QueryMsg, HandleMsg, ConfigResponse, GetMessageResponse
};
use crate::state::{
    config, config_get, Config, name_get, name_set
};

/// Contract instantiation tx
/// tx inputs are specified in InitMsg in msg.rs file
pub fn init<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    msg: InitMsg,
) -> StdResult<InitResponse> {
    let state = Config {
        default_name: msg.default_name
    };

    config(&mut deps.storage).save(&state)?;

    Ok(InitResponse::default())
}

/// General handler for contract tx input
/// tx inputs are defined HandleMsg enum in msg.rs file
pub fn handle<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    msg: HandleMsg,
) -> StdResult<HandleResponse<Empty>> {
    match msg {
        HandleMsg::SetName { name } => try_set_name(deps, env, name),
        
    }
}

fn try_set_name<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    name: String
) -> StdResult<HandleResponse> {
    let address_c = deps.api.canonical_address(&env.message.sender.clone())?;
    name_set(&mut deps.storage, address_c, name.clone())?;
    let res = HandleResponse {
        messages: vec![],
        log: vec![
            log("action", "SetName"),
            log("sender", env.message.sender),
            log("name", name),
        ],
        data: None,
    };

    Ok(res)
}


pub fn query<S: Storage, A: Api, Q: Querier>(
    deps: &Extern<S, A, Q>,
    msg: QueryMsg,
) -> StdResult<Binary> {
    match msg {
        QueryMsg::Config{} => {
            let config = config_get(&deps.storage)?;
            let out: Binary = to_binary(&ConfigResponse {
                default_name: config.default_name
            })?;
            Ok(out)
        }
        QueryMsg::GetMessage{ address } => {
            let address_c = deps.api.canonical_address(&address)?;
            let name = name_get(&deps.storage, address_c).unwrap();
            let greeting = format!("Hello {}", name);
            let out: Binary = to_binary(&GetMessageResponse {
                greeting
            })?;
            Ok(out)
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::state::{config, config_get,Config};
    use cosmwasm_std::testing::{mock_dependencies, mock_env, MOCK_CONTRACT_ADDR};

    const CANONICAL_LENGTH: usize = 20;

    // TODO: Add test cases for each HandleMsg
    #[test]
    fn set_name_works() {
        
    }
}
