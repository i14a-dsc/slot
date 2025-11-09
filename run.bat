@echo off
pushd %~dp0
:a
cmd /c bun i
cmd /c bun .
goto :a
