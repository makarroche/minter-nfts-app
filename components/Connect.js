import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useNetwork, 
} from "wagmi";

const Connect = () => {
  const { address, connector, isConnected } = useAccount();
  const { data: ensAvatar } = useEnsAvatar({ address });
  const { data: ensName } = useEnsName({ address });
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();

  if (isConnected) {
    return (
      <div className="text-sm font-light">
        {ensAvatar && <img src={ensAvatar} alt="ENS Avatar" />}
        <div>
          {ensName ? `${ensName} (${address})` : `Wallet Address: ` + address}
        </div>
        <div> {connector && chain && "Connected to " + connector?.name + " on " + chain.name + " Network"}</div>
        <button
          className="w-full py-4 mt-4 text-white bg-gray-400 border border-gray-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10"
          onClick={disconnect}
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-row">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            whilehover={{ scale: 1.1 }}
            whiletap={{ scale: 0.8 }}
            href="#"
            className="w-full py-4 mt-4 text-white bg-gray-400 border border-gray-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10"
          >
            <span className="mx-4 text-sm tracking-widest uppercase">
              {" "}
              Connect Wallet
            </span>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 w-56 mt-2 text-white origin-top-right bg-gray-400 border border-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
            <div className="flex flex-col py-1 ">
              {connectors.map((connector) => {
                return (
                  <Menu.Item key={connector?.id}>
                    {({ active }) => (
                      <button
                        disabled={!connector?.ready}
                        key={connector?.id}
                        onClick={() => connect({ connector })}
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-white"
                        }`}
                      >
                        {connector?.name}
                        {!connector?.ready && " (unsupported)"}
                        {isLoading &&
                          connector?.id === pendingConnector?.id &&
                          " (connecting)"}
                      </button>
                    )}
                  </Menu.Item>
                );
              })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default Connect;
