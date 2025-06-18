"use client"

import { useState } from "react"
import { Calculator, Ruler, Weight, DollarSign, FileText } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function AsphaltCalculatorPro() {
  // Area Calculator State
  const [length, setLength] = useState("")
  const [width, setWidth] = useState("")
  const [lengthUnit, setLengthUnit] = useState("ft")
  const [widthUnit, setWidthUnit] = useState("ft")

  // Volume Calculator State
  const [area, setArea] = useState("")
  const [thickness, setThickness] = useState("")
  const [areaUnit, setAreaUnit] = useState("sqft")
  const [thicknessUnit, setThicknessUnit] = useState("in")

  // Weight Calculator State
  const [volume, setVolume] = useState("")
  const [asphaltType, setAsphaltType] = useState("hot-mix")
  const [volumeUnit, setVolumeUnit] = useState("cuft")

  // Cost Calculator State
  const [quantity, setQuantity] = useState("")
  const [pricePerUnit, setPricePerUnit] = useState("")
  const [quantityUnit, setQuantityUnit] = useState("ton")

  // Asphalt densities (lbs per cubic foot)
  const asphaltDensities = {
    "hot-mix": 145,
    "warm-mix": 140,
    "cold-mix": 135,
    recycled: 130,
    porous: 120,
  }

  const calculateArea = () => {
    const l = Number.parseFloat(length)
    const w = Number.parseFloat(width)
    if (!l || !w) return 0

    // Convert to square feet
    let lengthInFt = l
    let widthInFt = w

    if (lengthUnit === "m") lengthInFt = l * 3.28084
    if (lengthUnit === "yd") lengthInFt = l * 3
    if (widthUnit === "m") widthInFt = w * 3.28084
    if (widthUnit === "yd") widthInFt = w * 3

    return lengthInFt * widthInFt
  }

  const calculateVolume = () => {
    const a = Number.parseFloat(area)
    const t = Number.parseFloat(thickness)
    if (!a || !t) return 0

    // Convert area to square feet
    let areaInSqFt = a
    if (areaUnit === "sqm") areaInSqFt = a * 10.7639
    if (areaUnit === "sqyd") areaInSqFt = a * 9

    // Convert thickness to feet
    let thicknessInFt = t
    if (thicknessUnit === "in") thicknessInFt = t / 12
    if (thicknessUnit === "cm") thicknessInFt = t / 30.48
    if (thicknessUnit === "mm") thicknessInFt = t / 304.8

    return areaInSqFt * thicknessInFt
  }

  const calculateWeight = () => {
    const v = Number.parseFloat(volume)
    if (!v) return { tons: 0, pounds: 0 }

    // Convert volume to cubic feet
    let volumeInCuFt = v
    if (volumeUnit === "cum") volumeInCuFt = v * 35.3147
    if (volumeUnit === "cuyd") volumeInCuFt = v * 27

    const density = asphaltDensities[asphaltType as keyof typeof asphaltDensities]
    const pounds = volumeInCuFt * density
    const tons = pounds / 2000

    return { tons, pounds }
  }

  const calculateCost = () => {
    const q = Number.parseFloat(quantity)
    const p = Number.parseFloat(pricePerUnit)
    if (!q || !p) return 0

    return q * p
  }

  const areaResult = calculateArea()
  const volumeResult = calculateVolume()
  const weightResult = calculateWeight()
  const costResult = calculateCost()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-orange-600 p-2 rounded-lg">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Asphalt Calculator Pro</h1>
                <p className="text-sm text-gray-500">Professional Construction Tools</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-orange-100 text-orange-800">
              v2.1 Pro
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Professional Asphalt Calculations</h2>
          <p className="text-gray-600">Accurate calculations for area, volume, weight, and cost estimation</p>
        </div>

        <Tabs defaultValue="area" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit">
            <TabsTrigger value="area" className="flex items-center gap-2">
              <Ruler className="h-4 w-4" />
              Area
            </TabsTrigger>
            <TabsTrigger value="volume" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Volume
            </TabsTrigger>
            <TabsTrigger value="weight" className="flex items-center gap-2">
              <Weight className="h-4 w-4" />
              Weight
            </TabsTrigger>
            <TabsTrigger value="cost" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Cost
            </TabsTrigger>
          </TabsList>

          {/* Area Calculator */}
          <TabsContent value="area">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ruler className="h-5 w-5 text-orange-600" />
                    Area Calculator
                  </CardTitle>
                  <CardDescription>Calculate the surface area for your asphalt project</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="length">Length</Label>
                      <div className="flex gap-2">
                        <Input
                          id="length"
                          type="number"
                          placeholder="0"
                          value={length}
                          onChange={(e) => setLength(e.target.value)}
                        />
                        <Select value={lengthUnit} onValueChange={setLengthUnit}>
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ft">ft</SelectItem>
                            <SelectItem value="m">m</SelectItem>
                            <SelectItem value="yd">yd</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="width">Width</Label>
                      <div className="flex gap-2">
                        <Input
                          id="width"
                          type="number"
                          placeholder="0"
                          value={width}
                          onChange={(e) => setWidth(e.target.value)}
                        />
                        <Select value={widthUnit} onValueChange={setWidthUnit}>
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ft">ft</SelectItem>
                            <SelectItem value="m">m</SelectItem>
                            <SelectItem value="yd">yd</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-orange-900">{areaResult.toLocaleString()} sq ft</div>
                      <div className="text-sm text-orange-700">Total Area</div>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium">{(areaResult / 9).toFixed(2)} sq yd</div>
                        <div className="text-gray-500">Square Yards</div>
                      </div>
                      <div>
                        <div className="font-medium">{(areaResult / 10.764).toFixed(2)} sq m</div>
                        <div className="text-gray-500">Square Meters</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Volume Calculator */}
          <TabsContent value="volume">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-orange-600" />
                    Volume Calculator
                  </CardTitle>
                  <CardDescription>Calculate the volume of asphalt needed</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="area">Area</Label>
                    <div className="flex gap-2">
                      <Input
                        id="area"
                        type="number"
                        placeholder="0"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                      />
                      <Select value={areaUnit} onValueChange={setAreaUnit}>
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sqft">sq ft</SelectItem>
                          <SelectItem value="sqm">sq m</SelectItem>
                          <SelectItem value="sqyd">sq yd</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="thickness">Thickness</Label>
                    <div className="flex gap-2">
                      <Input
                        id="thickness"
                        type="number"
                        placeholder="0"
                        value={thickness}
                        onChange={(e) => setThickness(e.target.value)}
                      />
                      <Select value={thicknessUnit} onValueChange={setThicknessUnit}>
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="in">in</SelectItem>
                          <SelectItem value="cm">cm</SelectItem>
                          <SelectItem value="mm">mm</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-900">{volumeResult.toFixed(2)} cu ft</div>
                      <div className="text-sm text-blue-700">Total Volume</div>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium">{(volumeResult / 27).toFixed(2)} cu yd</div>
                        <div className="text-gray-500">Cubic Yards</div>
                      </div>
                      <div>
                        <div className="font-medium">{(volumeResult / 35.315).toFixed(2)} cu m</div>
                        <div className="text-gray-500">Cubic Meters</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Weight Calculator */}
          <TabsContent value="weight">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Weight className="h-5 w-5 text-orange-600" />
                    Weight Calculator
                  </CardTitle>
                  <CardDescription>Calculate the weight of asphalt based on volume and type</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="volume">Volume</Label>
                    <div className="flex gap-2">
                      <Input
                        id="volume"
                        type="number"
                        placeholder="0"
                        value={volume}
                        onChange={(e) => setVolume(e.target.value)}
                      />
                      <Select value={volumeUnit} onValueChange={setVolumeUnit}>
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cuft">cu ft</SelectItem>
                          <SelectItem value="cum">cu m</SelectItem>
                          <SelectItem value="cuyd">cu yd</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="asphalt-type">Asphalt Type</Label>
                    <Select value={asphaltType} onValueChange={setAsphaltType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hot-mix">Hot Mix Asphalt (145 lb/cu ft)</SelectItem>
                        <SelectItem value="warm-mix">Warm Mix Asphalt (140 lb/cu ft)</SelectItem>
                        <SelectItem value="cold-mix">Cold Mix Asphalt (135 lb/cu ft)</SelectItem>
                        <SelectItem value="recycled">Recycled Asphalt (130 lb/cu ft)</SelectItem>
                        <SelectItem value="porous">Porous Asphalt (120 lb/cu ft)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-900">{weightResult.tons.toFixed(2)} tons</div>
                      <div className="text-sm text-green-700">Total Weight</div>
                    </div>
                    <Separator />
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Pounds:</span>
                        <span className="font-medium">{weightResult.pounds.toLocaleString()} lbs</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Kilograms:</span>
                        <span className="font-medium">{(weightResult.pounds * 0.453592).toLocaleString()} kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Density:</span>
                        <span className="font-medium">
                          {asphaltDensities[asphaltType as keyof typeof asphaltDensities]} lb/cu ft
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Cost Calculator */}
          <TabsContent value="cost">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-orange-600" />
                    Cost Calculator
                  </CardTitle>
                  <CardDescription>Calculate the total cost of your asphalt project</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <div className="flex gap-2">
                      <Input
                        id="quantity"
                        type="number"
                        placeholder="0"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                      <Select value={quantityUnit} onValueChange={setQuantityUnit}>
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ton">tons</SelectItem>
                          <SelectItem value="cuyd">cu yd</SelectItem>
                          <SelectItem value="sqft">sq ft</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price per Unit</Label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                        <Input
                          id="price"
                          type="number"
                          placeholder="0.00"
                          className="pl-8"
                          value={pricePerUnit}
                          onChange={(e) => setPricePerUnit(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-purple-900">${costResult.toLocaleString()}</div>
                      <div className="text-sm text-purple-700">Total Cost</div>
                    </div>
                    <Separator />
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Quantity:</span>
                        <span className="font-medium">
                          {quantity} {quantityUnit}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Price per {quantityUnit.slice(0, -1)}:</span>
                        <span className="font-medium">${pricePerUnit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Tax (est. 8%):</span>
                        <span className="font-medium">${(costResult * 0.08).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-medium pt-2 border-t">
                        <span>Total with Tax:</span>
                        <span>${(costResult * 1.08).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Reference */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-orange-600" />
              Quick Reference
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Typical Asphalt Thickness</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Driveways: 2-3 inches</li>
                  <li>• Parking lots: 3-4 inches</li>
                  <li>• Roads: 4-6 inches</li>
                  <li>• Heavy traffic: 6+ inches</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Coverage Estimates</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• 1 ton covers ~80 sq ft at 3"</li>
                  <li>• 1 cu yd covers ~108 sq ft at 3"</li>
                  <li>• Add 5-10% for waste</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Cost Factors</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Material: $40-80/ton</li>
                  <li>• Installation: $3-7/sq ft</li>
                  <li>• Prep work: $1-3/sq ft</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
