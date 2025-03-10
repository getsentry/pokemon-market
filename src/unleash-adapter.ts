import {FeatureFlagAdapter, FlagMap, FlagValue} from "@sentry/toolbar";
import type {UnleashClient, IStorageProvider} from 'unleash-proxy-client';
import {LocalStorageProvider, InMemoryStorageProvider} from 'unleash-proxy-client';

const FEATURE_FLAG_OVERRIDES = 'pokemon_market:sntry_tb:unleash:overrides';

function getLocalStorage(key: string): FlagMap {
  try {
    return JSON.parse(localStorage.getItem(key) ?? '{}');
  } catch {
    return {};
  }
}

function setLocalStorage(key: string, overrides: FlagMap) {
  try {
    localStorage.setItem(key, JSON.stringify(overrides));
  } catch {
    return;
  }
}

function clearLocalStorage(key: string) {
  localStorage.setItem(key, '{}');
}


// function overrideToggles(orig, overrides: FlagMap) {
//   return [
//     ...orig.filter(toggle => overrides[toggle.name] === undefined),
//     ...Object.entries(overrides).map(([name, value]) => {
//       if (typeof value === 'boolean' && Boolean(value)) {
//         return unleashBooleanFormatter(name, value);
//       }
//     }).filter(Boolean)
//   ];
// }

export function wrappedUnleashStorageProvider(storageProvider?: IStorageProvider): UnleashClient {
  // console.log('wrappedUnleashStorageProvider', storageProvider);
  // const backingStore = storageProvider ||
  //   (typeof window !== 'undefined'
  //       ? new LocalStorageProvider()
  //       : new InMemoryStorageProvider());

  // return {
  //   async get(key: string): Promise<any> {
  //     const orig = await backingStore.get(key);
  //     console.log('get - orig', key, orig);
  //     if (key !== 'repo') {
  //       return orig;
  //     }

  //     const overridden =  overrideToggles(orig, getLocalStorage(FEATURE_FLAG_OVERRIDES))
  //     console.log('get - override', key, overridden);
  //     return overridden;
  //   },
  //   save(key: string, value: any): Promise<void> {
  //     return backingStore.save(key, value);
  //   },
  // };
  return undefined;
}

// function unleashBooleanFormatter(name: string, value: boolean) {
//   return {
//     enabled: value,
//     impressionData: false,
//     name: name,
//     variant: {
//       enabled: false,
//       featureEnabled: true,
//       feature_enabled: true,
//       name: 'disabled',
//     },
//   };
// }
// function unleashVariantFormatter(name: string, [variantName, variantValue]: [string, string]) {
//   return {
//     enabled: name,
//     impressionData: false,
//     name: name,
//     variant: {
//       enabled: true,
//       featureEnabled : true,
//       feature_enabled : true,
//       name : variantName,
//       payload: {
//         type: "string",
//         value: variantValue
//       }
//     },
//   };
// }

export function getUnleashFlagAdapter(client: UnleashClient): FeatureFlagAdapter | null {
  // console.log('getFlagAdapter', client, client.toggles);

  // // // Want to inject overrides into the client
  // // function overrideToggles() {
  // //   const overrides = getLocalStorage(FEATURE_FLAG_OVERRIDES)
  // //   client.storeToggles([
  // //     ...client.toggles.filter(toggle => overrides[toggle.name] === undefined),
  // //     ...Object.entries(overrides).map(([name, value]) => {
  // //       if (typeof value === 'boolean' && Boolean(value)) {
  // //         return unleashBooleanFormatter(name, value);
  // //       }
  // //     }).filter(Boolean)
  // //   ]);
  // //   client.emit('update');
  // // }

  // // overrideToggles();
  // // console.log('new toggles', client.toggles);

  // client.on('initialized', () => {
  //   console.log('initialized', client);
  //   // overrideToggles();
  //   // Want to override client.toggles with the overrides
  // });
  // client.on('ready', () => {
  //   console.log('ready', client);
  //   // overrideToggles();
  //   // Want to override client.toggles with the overrides
  // });
  // client.on('update', () => {
  //   console.log('update', client);
  //   // overrideToggles();
  //   // Want to override client.toggles with the overrides
  // });

  return {
    getFlagMap(): Promise<FlagMap> {
      return Promise.resolve(
        Object.fromEntries(
          client.toggles.map(toggle => {
            if (toggle.variant.enabled) {
              // this is a non-boolean flag
              return [toggle.name, toggle.variant.payload.value];
            } else {
              return [toggle.name, true];
            }
          })
        )
      );
    },

    /**
     * Any overridden or manually set flags and values.
     */
    getOverrides(): Promise<FlagMap> {
      return Promise.resolve(getLocalStorage(FEATURE_FLAG_OVERRIDES));
    },

    /**
     * Manually set a flag to be a specific value, overriding the evaluated value.
     */
    setOverride(name: string, value: FlagValue): void {
      const prev = getLocalStorage(FEATURE_FLAG_OVERRIDES);
      const updated: FlagMap = {...prev, [name]: value};
      setLocalStorage(FEATURE_FLAG_OVERRIDES, updated);
    },

    /**
     * A callback to clear all overrides from this browser.
     */
    clearOverrides(): void {
      clearLocalStorage(FEATURE_FLAG_OVERRIDES);
    },

    urlTemplate(name: string): string | URL | undefined {
      const host = process.env.NEXT_PUBLIC_UNLEASH_HOST ?? 'http://localhost:4242';
      return `${host}/projects/default/features/${name}`;
    }
  };
}
