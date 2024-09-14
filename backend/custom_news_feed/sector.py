from enum import Enum

class Sector(Enum):
    TECHNOLOGY = 1
    HEALTHCARE = 2
    FINANCIAL = 3
    BASIC_MATERIALS = 4

    def describe(self):
        return f'This sector is {self.name.lower()}!'



# - Basic Materials
# - Conglomerates
# - Penny Stocks
# - Financial
# - Healthcare
# - Industrial Goods
# - Services
# - Technology
# - Utilities
