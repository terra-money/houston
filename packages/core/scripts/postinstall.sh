#!/usr/bin/env bash
# Install Rust
# TODO: fix rust install bug problem
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
# Set Rust PATH
source $HOME/.cargo/env
# Update Rust 
rustup update stable
# rustup update nightly
# Get wasm target option
rustup target list --installed
# rustup default nightly
rustup target add wasm32-unknown-unknown
