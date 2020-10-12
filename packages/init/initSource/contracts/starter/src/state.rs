use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use cosmwasm_std::{CanonicalAddr, StdError, StdResult, Storage};
use cosmwasm_storage::{singleton, Bucket, ReadonlyBucket, ReadonlySingleton, Singleton};

pub static CONFIG_KEY: &[u8] = b"config";
pub static NAME_KEY: &[u8] = b"name";

/// Config struct
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Config {
    /// nam in config
    pub default_name: String,
}

/// Config singleton initialization
pub fn config<S: Storage>(storage: &mut S) -> Singleton<S, Config> {
    singleton(storage, CONFIG_KEY)
}

/// Get config
pub fn config_get<S: Storage>(storage: &S) -> StdResult<Config> {
    ReadonlySingleton::new(storage, CONFIG_KEY).load()
}

/// Set config
pub fn config_set<S: Storage>(storage: &mut S, config: &Config) -> StdResult<()> {
    Singleton::new(storage, CONFIG_KEY).save(config)
}

/// Get name from address
pub fn name_get<S: Storage>(storage: &S, addr: CanonicalAddr) -> Option<CanonicalAddr> {
    match ReadonlyBucket::new(NAME_KEY, storage).may_load(&addr.as_slice()) {
        Ok(Some(wrapped_address)) => wrapped_address,
        _ => None,
    }
}

/// Set name from address
pub fn name_set<S: Storage>(
    storage: &mut S,
    address: CanonicalAddr,
    name: String
) -> StdResult<()> {
    match Bucket::new(NAME_KEY, storage).save(&address.as_slice(), &name) {
        Ok(_) => Ok(()),
        Err(_) => Err(StdError::generic_err(format!(
            "Failed to write to the state. key: {:?}, value: {:?}",
            address, name
        ))),
    }
}

