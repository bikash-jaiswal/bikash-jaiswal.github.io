---
title: "ADB Commands for App Installation"
date: "2026-01-14"
tags: ["Android", "ADB", "Mobile Development"]
---

## ADB Commands for Updating an Android App

### Check Connected Devices
First, verify that your Android device is properly connected and recognized by ADB:

```bash
./adb.exe devices
```

### Uninstall the Existing App
To remove the current version of the app before installing the new one:

```bash
./adb.exe uninstall com.example.appname
```

### Install the New Version
After uninstalling, install the new APK file:

```bash
./adb.exe install ./your-app-filename.apk
```

### Notes
- Make sure USB debugging is enabled on your Android device
- The device should be connected via USB
- The APK file should be in the same directory or provide the full path
- You might need to run these commands from the platform-tools directory where adb.exe is located
