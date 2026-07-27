export type SharedDanceDemoProfile = {
  id: string;
  label: string;
  count: string;
  target: string;
  corrections: Record<string, string>;
};

export type SharedDanceDemoState = {
  id: string;
  label: string;
  note: string;
  lens: string;
  nextStep: string;
};

export type SharedDanceDemoFocus = {
  id: string;
  label: string;
  cue: string;
  proof: string;
  nextStep: string;
};

export type SharedDanceDemoChecklistItem = {
  label: string;
  detail: string;
};

export const sharedDanceDemoProfiles: SharedDanceDemoProfile[] = [
  {
    id: "rumba",
    label: "伦巴",
    count: "2-3-4-1",
    target: "先把重心真的过脚，再让髋和上身自然分层。",
    corrections: {
      weight: "每一步都让重心完整到脚掌，不要留在两脚中间。",
      hip: "不要先甩髋，先过重心再让髋自然完成。",
      feet: "步幅收小，脚掌方向清楚，别急着做大动作。",
      frame: "胸口和视线先安静下来，不要上身先抢戏。",
    },
  },
  {
    id: "cha",
    label: "恰恰",
    count: "2-3-4&1",
    target: "锁步更干净，脚下轻重和节拍边界要明显。",
    corrections: {
      weight: "2 和 3 的重心切换要干净，不要拖在中间。",
      hip: "不要为了做髋而把节拍挤乱，先守住脚下。",
      feet: "& 拍收小一点，锁步不要跨太大。",
      frame: "上身保持提着，别跟着脚下左右晃散。",
    },
  },
  {
    id: "samba",
    label: "桑巴",
    count: "1-a-2",
    target: "bounce action 小而稳，节奏不断线。",
    corrections: {
      weight: "不要卡在脚跟，重心要持续往前滚动。",
      hip: "骨盆向前收住，别把 bounce 做成上下跳。",
      feet: "脚下保持连续，不要每一步都踩死。",
      frame: "肩颈放松，让弹性留在身体下半部。",
    },
  },
];

export const sharedDanceDemoStates: SharedDanceDemoState[] = [
  {
    id: "restart",
    label: "断练后重启",
    note: "别先追表现，先确认身体和拍子有没有重新接上。",
    lens: "先录最慢那一轮，看自己是不是真的又回到舞里了。",
    nextStep: "做完后只留一句“我下次先把哪里接回来”。",
  },
  {
    id: "beat",
    label: "拍子总乱",
    note: "先守住脚下和节拍边界，不急着做大动作和髋。",
    lens: "录 15 秒时先数两轮拍，再看自己是不是总在抢拍或拖拍。",
    nextStep: "如果还是乱，下一轮就只守住拍子，不追加别的要求。",
  },
  {
    id: "body",
    label: "已经知道卡点",
    note: "别再模糊地说“感觉不对”，先把问题落到身体部位。",
    lens: "回看时只盯一个身体部位，确认问题有没有真的落到身体层。",
    nextStep: "把问题写成动作句，比如“先让重心过脚”，而不是抽象评价。",
  },
  {
    id: "record",
    label: "准备录切片",
    note: "录切片不是为了更花，而是为了下轮更会练。",
    lens: "确认画面里脚下和上身都看得见，不然 witness 不够可回看。",
    nextStep: "如果这轮还说不清下次只改哪里，就别急着把它留下来。",
  },
];

export const sharedDanceDemoFocuses: SharedDanceDemoFocus[] = [
  {
    id: "weight",
    label: "重心",
    cue: "每一步都问自己：我有没有真的到脚下？",
    proof: "对应旧站 Body System 里最基础也最常见的卡点。",
    nextStep: "下一轮先确认每一步的重心有没有完整到脚下，不急着加快。",
  },
  {
    id: "hip",
    label: "髋",
    cue: "先过重心，再让髋自然完成，不要抢在脚前面。",
    proof: "它适合用来验证“问题能不能被压成一个具体动作句”。",
    nextStep: "下一轮先守住重心后移再让髋自然完成，不要先甩髋。",
  },
  {
    id: "feet",
    label: "脚下",
    cue: "把步幅收小，让节拍和方向先变清楚。",
    proof: "这通常最容易从视频回看里直接看出差异。",
    nextStep: "下一轮先把步幅收小，把节拍边界和脚下方向守清楚。",
  },
  {
    id: "frame",
    label: "上身",
    cue: "视线稳定，肩颈放松，别让上身先乱掉。",
    proof: "它能验证“不是所有问题都要先从腿脚修起”。",
    nextStep: "下一轮先让视线和肩颈安静下来，不让上身先抢戏。",
  },
];

export const sharedDanceDemoChecklist: SharedDanceDemoChecklistItem[] = [
  { label: "先录 15 秒", detail: "不要一上来录太长，先拿到一个能回看的最小 witness。" },
  { label: "只修 1 个点", detail: "这一轮不要同时修重心、髋、脚下和上身。" },
  { label: "回看时先说问题", detail: "先说出问题在哪里，再决定下轮动作。" },
  { label: "留下下一步", detail: "如果做完后说不出“下轮只改哪里”，这轮就还没闭环。" },
];
