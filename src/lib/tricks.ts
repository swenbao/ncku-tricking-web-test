
import { difficultyLevels } from './difficultyLevels';

export type TrickLevel = typeof difficultyLevels[number]['name'];

export interface Trick {
  id: string;
  name: string;
  level: TrickLevel;
  description?: string;
  categories: string[];
  prerequisites?: string[];
  videoUrl?: string;
  isPrerequisite?: boolean; // Add this property to fix the JoinFlow component
}

export const tricks: Trick[] = [
  {
    id: "d3cd45a5-265e-468c-9292-afe64a3d0ea9",
    name: "360 Front Kick",
    level: "Absolute Novice",
    description: "A basic 360-degree rotational kick, landing on the same foot you jump from.",
    categories: ["Kick"],
    prerequisites: []
  },
  {
    id: "f14d1c5f-5eb9-4d0a-8491-a3d050c4bb12",
    name: "Aerial",
    level: "Absolute Novice",
    description: "A side flip with no hands touching the ground, landing on one or both feet.",
    categories: ["Flip"],
    prerequisites: [],
    isPrerequisite: true // Mark as a prerequisite for advanced classes
  },
  {
    id: "b5dd72e6-d817-4821-bc67-87268d2a0be2",
    name: "Aeriola",
    level: "Absolute Novice",
    description: "A variation of the Aerial with a specific landing.",
    categories: ["Flip"],
    prerequisites: ["Aerial"]
  },
  {
    id: "7ed63ec5-ad09-4ea0-9695-7fa3ac2d826a",
    name: "Au-Batido",
    level: "Absolute Novice",
    description: "A Capoeira movement that transitions from a cartwheel to a kick.",
    categories: ["Transition", "Kick"],
    prerequisites: ["Cartwheel"]
  },
  {
    id: "60caf7ad-fc52-4d76-8ea6-75103d764114",
    name: "Backflip",
    level: "Beginner",
    description: "A backward somersault, landing on your feet.",
    categories: ["Flip"],
    prerequisites: [],
    isPrerequisite: true // Mark as a prerequisite for advanced classes
  },
  {
    id: "22ba69bb-1797-479d-be2d-a1107b5eab49",
    name: "Backside 360",
    level: "Beginner",
    description: "A 360-degree spin where you rotate away from the direction you're facing.",
    categories: ["Twist"],
    prerequisites: []
  },
  {
    id: "afd0d658-9e0b-4c95-b989-04422a7d897f",
    name: "Barani",
    level: "Intermediate",
    description: "A frontflip with a 180-degree twist, landing facing the opposite direction.",
    categories: ["Flip", "Twist"],
    prerequisites: ["Frontflip"]
  },
  {
    id: "5bdce20d-ccb3-44f1-87e5-98e0ebc6f2d3",
    name: "Butterfly Kick",
    level: "Beginner",
    description: "A horizontal aerial rotation where your body is parallel to the ground.",
    categories: ["Kick"],
    prerequisites: [],
    isPrerequisite: true // Mark as a prerequisite for advanced classes
  },
  {
    id: "0b8e795d-c6a0-4e4b-b7f0-40c4afd75d5a",
    name: "Cartwheel",
    level: "Absolute Novice",
    description: "A sideways handspring with legs spread apart.",
    categories: ["Ground Movement"],
    prerequisites: [],
    isPrerequisite: true // Mark as a prerequisite for advanced classes
  },
  {
    id: "c5c632bd-2b76-4c4d-a16a-172adfa4d18c",
    name: "Cheat 720",
    level: "Advanced",
    description: "A setup technique into a 720-degree spin, typically for kicks.",
    categories: ["Twist", "Kick"],
    prerequisites: ["Cheat 360", "Backside 360"]
  }
];

// For debugging purposes, let's log the first few trick IDs to see their format
console.log("Debug - First few trick IDs:", 
  tricks.slice(0, 3).map(t => ({ id: t.id, name: t.name }))
);
