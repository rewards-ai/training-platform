from pathlib import Path 
from dataclasses import dataclass

@dataclass
class EnvConfig:
    firebase_json_secret_path : str = '.secrets/firebase_config.json'
    assets_components : Path = Path('assets/components') 
    assets_images : Path = Path('assets/images') 


if __name__ == '__main__':
    env = EnvConfig
    print(env.assets_components)
    print(env.firebase_json_secret_path)
    print(env.assets_images)
    