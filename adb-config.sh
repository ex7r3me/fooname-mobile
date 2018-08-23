#!/bin/sh
adb reverse tcp:8080 tcp:8080
adb reverse tcp:22 tcp:22
adb reverse tcp:9090 tcp:9090
