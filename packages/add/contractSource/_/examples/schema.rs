use std::env::current_dir;
use std::fs::create_dir_all;
use std::path::{Path, PathBuf};

use cosmwasm_schema::{export_schema, remove_schemas, schema_for};

use starter::msg::*;
use starter::state::*;

fn main() {
    let mut out_dir: PathBuf = current_dir().unwrap().parent().unwrap().parent().unwrap().to_path_buf();
    out_dir.push("schemas");
    out_dir.push(format!("{}_schema", option_env!("CARGO_PKG_NAME").unwrap()));
    create_dir_all(&out_dir).unwrap();
    remove_schemas(&out_dir).unwrap();

    export_schema(&schema_for!(InitMsg), &out_dir);
    export_schema(&schema_for!(HandleMsg), &out_dir);
    export_schema(&schema_for!(QueryMsg), &out_dir);
    export_schema(&schema_for!(Config), &out_dir);
    export_schema(&schema_for!(ConfigResponse), &out_dir);
    export_schema(&schema_for!(GetMessageResponse), &out_dir);
}
