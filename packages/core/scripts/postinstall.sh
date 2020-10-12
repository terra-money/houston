#!/usr/bin/env bash
# Install Rust
curl https://sh.rustup.rs -sSf | sh -s -- -y
# Set Rust PATH
source $HOME/.cargo/env
# Set Rust as stable version
rustup default stable
# Update Rust 
rustup update stable
# Get wasm target option
rustup target list --installed
rustup target add wasm32-unknown-unknown
