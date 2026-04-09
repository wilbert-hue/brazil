"""Generate Brazil-only Vehicle Scrapping Market data with new segments."""
import json, random, math

random.seed(42)
YEARS = list(range(2021, 2034))

def series(start, cagr, noise=0.02):
    vals = []
    v = start
    for i, y in enumerate(YEARS):
        v_y = start * ((1 + cagr) ** i)
        v_y *= (1 + random.uniform(-noise, noise))
        vals.append(round(v_y, 1))
    return {str(y): vals[i] for i, y in enumerate(YEARS)}

def leaves_to_dict(leaves):
    return {name: series(start, cagr) for name, start, cagr in leaves}

# By Vehicle Type (totals add roughly to total market)
by_vehicle_type = {
    "Passenger Vehicles": series(120, 0.085),
    "Commercial Vehicles": {
        "Light Commercial Vehicles": series(45, 0.082),
        "Heavy Commercial Vehicles": series(38, 0.078),
    },
    "Buses": series(18, 0.07),
    "Two-Wheelers": series(22, 0.09),
    "Off-Road Vehicles": series(10, 0.065),
}

by_material = {
    "Metals": {
        "Ferrous Metals": {
            "Carbon Steel": series(48, 0.08),
            "Cast Iron": series(22, 0.072),
            "Stainless Steel": series(14, 0.085),
        },
        "Non-Ferrous Metals": {
            "Aluminum (Wrought Aluminum and Cast Aluminum)": series(28, 0.088),
            "Copper (Wiring Copper and Motor or Coil Copper)": series(18, 0.092),
            "Other Non-Ferrous Metals (Lead, Zinc, Nickel, etc.)": series(9, 0.07),
        },
    },
    "Polymers": {
        "Plastics": {
            "Polypropylene (PP)": series(15, 0.083),
            "Polyurethane (PU)": series(9, 0.078),
            "Polyvinyl Chloride (PVC)": series(7, 0.072),
            "ABS and Engineering Plastics": series(11, 0.086),
        },
        "Rubber": {
            "Natural Rubber": series(8, 0.07),
            "Synthetic Rubber (Tires, Seals, Hoses)": series(13, 0.082),
        },
    },
    "Glass (Laminated Glass and Tempered Glass)": series(10, 0.068),
    "Fluids and Hazardous Waste (Engine Oil, Transmission Fluid, Coolants, Brake Fluids, etc.)": series(7, 0.065),
}

by_source = leaves_to_dict([
    ("Individual Owners", 60, 0.082),
    ("Fleet Owners", 42, 0.085),
    ("Insurance Total-Loss Vehicles", 35, 0.088),
    ("Government and Auction Vehicles", 25, 0.075),
    ("Dealer and Trade-In Channels", 38, 0.08),
])

by_end_use = leaves_to_dict([
    ("Reusable Parts", 55, 0.083),
    ("Secondary Raw Material for Manufacturing", 90, 0.087),
    ("Energy Recovery", 30, 0.075),
    ("Disposal", 18, 0.06),
])

brazil_value = {
    "By Vehicle Type": by_vehicle_type,
    "By Material Recovered": by_material,
    "By Source of Vehicle Inflow": by_source,
    "By End Use of Recovered Output": by_end_use,
}

# Volume = larger numbers (units)
random.seed(7)
def vseries(start, cagr, noise=0.02):
    return series(start, cagr, noise)

by_vehicle_type_v = {
    "Passenger Vehicles": vseries(850, 0.075),
    "Commercial Vehicles": {
        "Light Commercial Vehicles": vseries(320, 0.072),
        "Heavy Commercial Vehicles": vseries(210, 0.068),
    },
    "Buses": vseries(95, 0.06),
    "Two-Wheelers": vseries(720, 0.082),
    "Off-Road Vehicles": vseries(55, 0.058),
}
by_material_v = {
    "Metals": {
        "Ferrous Metals": {
            "Carbon Steel": vseries(380, 0.072),
            "Cast Iron": vseries(170, 0.065),
            "Stainless Steel": vseries(95, 0.078),
        },
        "Non-Ferrous Metals": {
            "Aluminum (Wrought Aluminum and Cast Aluminum)": vseries(190, 0.078),
            "Copper (Wiring Copper and Motor or Coil Copper)": vseries(110, 0.082),
            "Other Non-Ferrous Metals (Lead, Zinc, Nickel, etc.)": vseries(60, 0.062),
        },
    },
    "Polymers": {
        "Plastics": {
            "Polypropylene (PP)": vseries(105, 0.075),
            "Polyurethane (PU)": vseries(62, 0.07),
            "Polyvinyl Chloride (PVC)": vseries(48, 0.065),
            "ABS and Engineering Plastics": vseries(78, 0.078),
        },
        "Rubber": {
            "Natural Rubber": vseries(55, 0.062),
            "Synthetic Rubber (Tires, Seals, Hoses)": vseries(92, 0.074),
        },
    },
    "Glass (Laminated Glass and Tempered Glass)": vseries(70, 0.06),
    "Fluids and Hazardous Waste (Engine Oil, Transmission Fluid, Coolants, Brake Fluids, etc.)": vseries(48, 0.058),
}
by_source_v = {
    "Individual Owners": vseries(420, 0.073),
    "Fleet Owners": vseries(290, 0.076),
    "Insurance Total-Loss Vehicles": vseries(240, 0.078),
    "Government and Auction Vehicles": vseries(170, 0.067),
    "Dealer and Trade-In Channels": vseries(260, 0.072),
}
by_end_use_v = {
    "Reusable Parts": vseries(380, 0.074),
    "Secondary Raw Material for Manufacturing": vseries(620, 0.078),
    "Energy Recovery": vseries(210, 0.067),
    "Disposal": vseries(125, 0.052),
}

brazil_volume = {
    "By Vehicle Type": by_vehicle_type_v,
    "By Material Recovered": by_material_v,
    "By Source of Vehicle Inflow": by_source_v,
    "By End Use of Recovered Output": by_end_use_v,
}

def is_leaf(d):
    return isinstance(d, dict) and d and all(k.isdigit() for k in d.keys())

def aggregate(node):
    """Recursively add parent aggregations: parent gets sum of children leaves alongside child dict."""
    if not isinstance(node, dict) or is_leaf(node):
        return node
    # recurse first
    child_leaves = []
    for k, v in list(node.items()):
        node[k] = aggregate(v)
        if is_leaf(node[k]):
            child_leaves.append(node[k])
        elif isinstance(node[k], dict):
            # find the aggregated year data inside (stored under year keys at same level as child dict)
            agg = {kk: vv for kk, vv in node[k].items() if kk.isdigit()}
            if agg:
                child_leaves.append(agg)
    if child_leaves:
        agg = {}
        for y in [str(y) for y in YEARS]:
            agg[y] = round(sum(c.get(y, 0) for c in child_leaves), 1)
        # merge agg year keys into node alongside children
        for y, v in agg.items():
            node[y] = v
    return node

for seg_name in list(brazil_value.keys()):
    brazil_value[seg_name] = aggregate(brazil_value[seg_name])
for seg_name in list(brazil_volume.keys()):
    brazil_volume[seg_name] = aggregate(brazil_volume[seg_name])

value_json = {"Brazil": brazil_value}
volume_json = {"Brazil": brazil_volume}

# Segmentation analysis: empty leaves with same hierarchy, plus By Region with only Brazil
def to_empty(obj):
    if isinstance(obj, dict):
        # if leaf (year keys)
        if obj and all(k.isdigit() for k in obj.keys()):
            return {}
        return {k: to_empty(v) for k, v in obj.items()}
    return {}

seg = {
    "Global": {
        "By Vehicle Type": to_empty(by_vehicle_type),
        "By Material Recovered": to_empty(by_material),
        "By Source of Vehicle Inflow": to_empty(by_source),
        "By End Use of Recovered Output": to_empty(by_end_use),
        "By Region": {
            "Brazil": {}
        }
    }
}

with open("public/data/value.json", "w", encoding="utf-8") as f:
    json.dump(value_json, f, indent=2, ensure_ascii=False)
with open("public/data/volume.json", "w", encoding="utf-8") as f:
    json.dump(volume_json, f, indent=2, ensure_ascii=False)
with open("public/data/segmentation_analysis.json", "w", encoding="utf-8") as f:
    json.dump(seg, f, indent=2, ensure_ascii=False)

print("Done")
