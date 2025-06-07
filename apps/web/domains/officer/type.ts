interface FLoorOfficerType {
  id: string;
  name: string;
  space: SpaceOfficerType[];
  created_at: Date;
}

interface CreateFLoorOfficerType {
  name: string;
}

interface CreateSpaceOfficerType {
  name: string;
  floor_id: string;
}

interface SpaceOfficerType {
  id: string;
  name: string;
  created_at: Date;
}

export type {
  FLoorOfficerType,
  SpaceOfficerType,
  CreateSpaceOfficerType,
  CreateFLoorOfficerType,
};
