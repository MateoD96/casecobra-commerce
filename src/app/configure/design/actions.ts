"use server";

import { db } from "@/db";
import {
  CaseColor,
  CaseFinish,
  CaseMaterial,
  PhoneModel,
} from "@prisma/client";

export type SaveConfigArgs = {
  color: CaseColor;
  material: CaseMaterial;
  model: PhoneModel;
  finish: CaseFinish;
  configId: string;
};

export async function saveConfig({
  color,
  material,
  model,
  finish,
  configId,
}: {
  color: CaseColor;
  material: CaseMaterial;
  model: PhoneModel;
  finish: CaseFinish;
  configId: string;
}) {
  await db.imagesConfiguration.update({
    where: {
      id: configId,
    },
    data: {
      color,
      material,
      model,
      finish,
    },
  });
}
