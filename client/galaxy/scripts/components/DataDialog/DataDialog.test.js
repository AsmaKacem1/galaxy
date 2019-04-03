import sinon from "sinon";
import { mount } from "@vue/test-utils";
import DataDialog from "./DataDialog.vue";
import { __RewireAPI__ as rewire } from "./DataDialog";
import { Model } from "./model.js";

describe("model.js", () => {
    let result = null
    it("Model operations for single, no format", () => {
        let model = new Model();
        try {
            model.add({ idx: 1 });
            throw "Accepted invalid record.";
        } catch (error) {
            expect(error).to.equals("Invalid record with no <id>.");
        }
        model.add({ id: 1 });
        expect(model.count()).to.equals(1);
        expect(model.exists(1)).to.equals(true);
        model.add({ id: 2, tag: "tag" });
        expect(model.count()).to.equals(1);
        expect(model.exists(1)).to.equals(false);
        expect(model.exists(2)).to.equals(true);
        result = model.finalize();
        expect(result.id).to.equals(2);
        expect(result.tag).to.equals("tag");
    });
    it("Model operations for multiple, with format", () => {
        let model = new Model({ multiple: true, format: "tag" });
        model.add({ id: 1, tag: "tag_1" });
        expect(model.count()).to.equals(1);
        model.add({ id: 2, tag: "tag_2" });
        expect(model.count()).to.equals(2);
        result = model.finalize();
        expect(result.length).to.equals(2);
        expect(result[0]).to.equals("tag_1");
        expect(result[1]).to.equals("tag_2");
        model.add({ id: 1 });
        expect(model.count()).to.equals(1);
        result = model.finalize();
        expect(result[0]).to.equals("tag_2");
    });
});

describe("DataDialog.vue", () => {
    let stub;
    let wrapper;
    let emitted;

    let mockAxios = {
        get: () => null
    };

    let mockGetGalaxyInstanceNoHistory = () => {
        return {};
    };

    beforeEach(() => {
        rewire.__Rewire__("axios", mockAxios);
    });

    afterEach(() => {
        if (stub) stub.restore();
    });

    it("loads correctly, shows alert", () => {
        //rewire.__Rewire__("getGalaxyInstance", mockGetGalaxyInstanceNoHistory);
        wrapper = mount(DataDialog, {
            propsData: {
                callback: () => {}
            }
        });
        emitted = wrapper.emitted();
        expect(wrapper.classes()).contain("data-dialog-modal");
        expect(wrapper.find(".alert").text()).to.equals("Datasets not available.");
        expect(wrapper.find(".btn-secondary").text()).to.equals("Clear");
        expect(wrapper.find(".btn-primary").text()).to.equals("Close");
    });
});
