
import { AppShortcut, Game, SystemStats } from "@/types";

export const mockGames: Game[] = [
  {
    id: "1",
    name: "Call of Duty Mobile",
    packageName: "com.activision.callofduty.shooter",
    icon: "https://play-lh.googleusercontent.com/9Y-xblw8XUBtnjdS4vNPGKF0m4MgN5dLfFSR9D5J1PU0ZL74a8CBOPd7dn4wW4Vkfg=w240-h480-rw",
    isOptimized: true,
    customSettings: {
      dndMode: true,
      performanceMode: true,
      ramBoost: true,
      networkOptimize: false,
    }
  },
  {
    id: "2",
    name: "Genshin Impact",
    packageName: "com.mihoyo.genshinimpact",
    icon: "https://play-lh.googleusercontent.com/So-Es3-9YAMw0tJJyQWoJD_oROS9LgcwS6f_MH6ror8S0dLgRCEWDauGrGGT1U9dzg=w240-h480-rw",
    isOptimized: true,
    customSettings: {
      dndMode: true,
      performanceMode: true,
      ramBoost: true,
      networkOptimize: true,
    }
  },
  {
    id: "3",
    name: "PUBG Mobile",
    packageName: "com.tencent.ig",
    icon: "https://play-lh.googleusercontent.com/JRd05pyBH41qjgsJuWduRJpDeZG0Hnb0yjf2nWqO7VaGKL10-G5UIygxED-WNOc3pg=w240-h480-rw",
    isOptimized: false,
  },
  {
    id: "4",
    name: "Minecraft",
    packageName: "com.mojang.minecraftpe",
    icon: "https://play-lh.googleusercontent.com/VSwHQjcAttxsLE47RuS4PqpC4LT7lCoSjE7Hx5AW_yCxtDvcnsHHvm5CTuL5BPN-uRTP=w240-h480-rw",
    isOptimized: false,
  },
  {
    id: "5",
    name: "Asphalt 9",
    packageName: "com.gameloft.android.ANMP.GloftA9HM",
    icon: "https://play-lh.googleusercontent.com/j7z01UGz1quN2hkWaHQ5xhQgG-ojolF97x9yI7pyFRbdt1UBJeB-S3RPFc_GZ3sapw=w240-h480-rw",
    isOptimized: false,
  },
];

export const mockShortcuts: AppShortcut[] = [
  {
    id: "1",
    name: "WhatsApp",
    packageName: "com.whatsapp",
    icon: "https://play-lh.googleusercontent.com/bYtqbOcTYOlgc6gqZ2rwb8lptHuwlNE75zYJu6Bn076-hTmvd96HH-6v7S0YUAAJXoJN=w240-h480-rw"
  },
  {
    id: "2",
    name: "Discord",
    packageName: "com.discord",
    icon: "https://play-lh.googleusercontent.com/6hbRJ-rMmJQ-DiXiZ2OgRWVLCZ-mE8H0fkrGcm0I-KqcMpnZQnA4q76RNjlnDwVYBHSj=w240-h480-rw"
  },
  {
    id: "3",
    name: "YouTube",
    packageName: "com.google.android.youtube",
    icon: "https://play-lh.googleusercontent.com/lMoItBgdPPVDJsNOVtP26EKHePkwBg-PkuY9NOrc-fumRtTFP4XhpUNk_22syN4Datc=w240-h480-rw"
  },
];

export const mockSystemStats: SystemStats = {
  ramUsage: 64,
  cpuTemp: 38,
  fps: 60,
  batteryLevel: 85,
};
