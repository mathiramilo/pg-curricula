def print_error(message: str):
    print(f"\033[91m{message}\033[0m")


def print_success(message: str):
    print(f"\033[92m{message}\033[0m")


def print_info(message: str):
    print(f"\033[94m{message}\033[0m")


def print_warning(message: str):
    print(f"\033[93m{message}\033[0m")


def print_debug(message: str):
    print(f"\033[95m{message}\033[0m")
