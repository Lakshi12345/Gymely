import PageBreadcrumb from "../../components/common/PageBreadCrumb.tsx";
import ComponentCard from "../../components/common/ComponentCard.tsx";
import Label from "../../components/form/Label.tsx";
import Input from "../../components/form/input/InputField.tsx";
import React, {useEffect, useState} from "react";
import api from "../../services/api.ts";
import Checkbox from "../../components/form/input/Checkbox.tsx";
import Radio from "../../components/form/input/Radio.tsx";
import Button from "../../components/ui/button/Button.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";

function PackageAdd(){

    const [services, setServices]  = useState([]);
    const [selectedService, setSelectedService] = useState(['Gym']);
    const [formData, setFormData] = useState([]);
    const [sessionData, setSessionData] = useState([]);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async ()=>{
        const services =  await  api.get('/service/getServices');
        setServices(services.data.data);
    }

    const handleServiceChange = (checked: boolean, serviceName : string) => {
        // const { value, checked } = e.target;

        // console.log(checked + serviceName);
        if (checked) {
            setSelectedService((prev) => [...prev, serviceName]);
            // console.log(selectedService)
        }
        else {
            setSelectedService((prev) =>
                prev.filter((service) => service !== serviceName)
            );
        }
    };

    const [selectGstType, setSelectGstType] = useState("NO");

    const handleRadioChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setSelectGstType(e);
        // console.log(selectGstType);
    }
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
       setFormData({
           ...formData,
           [e.target.name] : e.target.value,
       })
    }


    const onSessionChange = async (e:React.ChangeEvent<HTMLInputElement>)=>{
        console.log(e.target.value);

        const name = e.target.name;
        const value = e.target.value;
        const matchedService = selectedService.find((val) => val===name);

        setSessionData((prev) => {
            const exists = prev.find((item) => item.name === matchedService);

            if (exists) {
                return prev.map((item) =>
                    item.name === matchedService
                        ? { ...item, session: value }
                        : item
                );
            }

            return [
                ...prev,
                {
                    name: matchedService,
                    session: value,
                },
            ];
        });

        console.log(sessionData);
    }
    const handleAddPakckageClick = async (e:React.FormEvent)=>{

        e.preventDefault();
        try {

            let finalData = {
                ...formData,
                sessionData,
                isIncludeGst : selectGstType,
            }
            console.log(finalData);

            const response = await api.post('/package/packageAdd', finalData);
            console.log(response.data);
            // setShowSuccessModal(true);
            // console.log(formData);
        }catch (error : any){
            // toast.error(error.response?.data?.error || "Something went wrong !");
            console.log(error.response?.data);
        }
    }

    return(
      <>
          <PageBreadcrumb pageTitle="Create New Package" />
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-1">
              <div className="space-y-6">
                  <ComponentCard title="Package Details">
                      <div className="space-y-6">
                          <div>
                              <Label htmlFor="packageName">Package Name</Label>
                              <Input
                                  onChange={handleInputChange}
                                  type="text" id="packageName" name="packageName"  placeholder="Gym Monthly"/>
                          </div>
                          <div>
                              <Label htmlFor="duration">Duration</Label>
                              <Input
                                  onChange={handleInputChange}
                                  type="number" id="duration" name="duration" placeholder="30" />
                          </div>


                          <div className="flex gap-4">
                              {
                                  services.map((serv) => (
                                      <div key={serv._id} className="flex items-center gap-3">
                                          <Checkbox
                                              id = {serv.name}
                                              checked={selectedService.includes(serv.name)}
                                              value={serv.name}
                                              onChange={(checked)=>handleServiceChange(checked, serv.name)}
                                              label={serv.name}
                                          />
                                      </div>
                                  ))
                              }
                          </div>

                          {
                              selectedService.map((list)=>(
                                  <div>
                                      <Label htmlFor={list}>{list} Session : </Label>
                                      <Input
                                          onChange={onSessionChange}
                                          type="text" id={list} name={list}  placeholder="30"/>
                                  </div>
                              ))
                          }
                          <div>
                              <Label>Package Amount</Label>
                              <Input type="text" id="amount" name="amount" onChange={handleInputChange}  placeholder="1000"/>
                          </div>
                         <div>
                             <Label htmlFor="duration">Package Include GST</Label>
                             <div className="flex gap-4">
                                 <Radio
                                     id="No"
                                     name="isIncludeGst"
                                     value="NO"
                                     checked={selectGstType === "NO"}
                                     onChange={handleRadioChange}
                                     label="NO"
                                 />
                                 <Radio
                                     id="Yes"
                                     name="isIncludeGst"
                                     value="YES"
                                     checked={selectGstType === "YES"}
                                     onChange={handleRadioChange}
                                     label="YES"
                                 />

                             </div>
                         </div>



                          <div>
                              <Label>Minimum Sales Percent</Label>
                              <Input
                                  name="minimumSalePercent"
                                  onChange={handleInputChange}
                                  type="number" placeholder="10"
                              />
                          </div>
                          <div className="flex justify-center">
                              <Button
                                  className="transition"
                                  variant="primary"
                                  size="md"
                                  onClick={handleAddPakckageClick}
                                  startIcon={
                                      <FontAwesomeIcon
                                          icon={faPlusCircle}
                                      />
                                  }
                              >
                                  Create Package
                              </Button>
                          </div>
                      </div>
                  </ComponentCard>

              </div>

          </div>
      </>
    );
}
export  default PackageAdd;